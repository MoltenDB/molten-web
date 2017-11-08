"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pathHandler_1 = require("./lib/pathHandler");
var viewCollectionOptions_1 = require("./lib/viewCollectionOptions");
var logger_1 = require("./lib/logger");
var events = require("./events");
/**
 * Listens for and responds to web-app-specific events to the given Socket.IO
 * instance.
 */
exports.socketHandler = function (mdb, server, options) {
    var logger = (options.logger || logger_1.attachId(console)).id('View request socket handler');
    //TODO Check the views collection exists
    var collectionOptions = Object.assign({
        name: options.viewsCollection,
        storage: {
            default: {
                type: options.viewsCollectionStorage || 'default',
                collection: options.viewsCollection
            }
        }
    }, viewCollectionOptions_1.default);
    return mdb.checkCollection(collectionOptions).then(function (status) {
        if (typeof status === 'undefined') {
            logger.info('Creating views collection');
            // Create collection
            return mdb.createCollection(collectionOptions).then(function (collection) {
                var builtins = require('./views/index').default;
                logger.info('Populating views collection with standard views', Object.keys(builtins).join(', '));
                return collection.create(Object.keys(builtins).map(function (id) { return builtins[id]; }));
            });
        }
        else if (status === false) {
            return mdb.updateCollection(collectionOptions);
        }
        else {
            return Promise.resolve();
        }
    }).then(function () {
        logger.info("Attaching " + events.pathQueryEvent + " event handler");
        server.on('connection', function (socket) {
            socket.on("" + (options.eventBaseName || '') + events.pathQueryEvent, pathHandler_1.createPathHandler(mdb, socket, options));
        });
    });
};
exports.default = exports.socketHandler;
