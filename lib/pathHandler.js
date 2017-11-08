"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.createPathHandler = function (mdb, socket, options) {
    if (options.cachePaths) {
    }
    return function (data) {
        console.log('received path query event', data);
        mdb.collection(options.viewsCollection).then(function (collection) {
            console.log('got collections collection', collection);
            return collection.read({ path: data.path });
        }).then(function (results) {
            console.log('got results', results);
            if (results.length) {
                socket.emit((options.eventBaseName || '') + "result", __assign({}, data, { code: 200, results: results.raw() }));
            }
            else {
                socket.emit((options.eventBaseName || '') + "result", {
                    id: data.id,
                    code: 404
                });
            }
        }).catch(function (error) {
            console.log('caught an error', error);
            socket.emit((options.eventBaseName || '') + "result", {
                code: 500,
                message: error.message
            });
        });
    };
};
