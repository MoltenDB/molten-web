import { createPathHandler } from './lib/pathHandler';
import viewCollectionOptions from './lib/viewCollectionOptions';
import { attachId } from './lib/logger';

import { CommonOptions, Logger } from '../typings/molten-web';
import * as events from './events';
import * as MDB from 'molten-core';

interface Options extends CommonOptions {
  eventBaseName?: string,
  /// Whether or not to cache paths instead of just the paths with parameters
  cacheAllPaths?: boolean,
  /**
   * If true, the Promise will reject if the view collection does not exist.
   * Otherwise, if the view collection does not exist, it will create it and
   * populate it with ____
   */
  noCollectionCreation?: boolean,
  /// Logger to use
  logger?: Logger
}

/**
 * Listens for and responds to web-app-specific events to the given Socket.IO
 * instance.
 */
export const socketHandler = (mdb: MDB.MoltenDBInstance,
    server: SocketIO.Server, options: Options): Promise<void> => {
  const logger = (options.logger || attachId(console)).id('View request socket handler');

  //TODO Check the views collection exists
  const collectionOptions = Object.assign({
    name: options.viewsCollection,
    storage: {
      default: {
        type: options.viewsCollectionStorage || 'default',
        collection: options.viewsCollection
      }
    }
  }, viewCollectionOptions);

  return mdb.checkCollection(collectionOptions).then((status) => {
    if (typeof status === 'undefined') {
      logger.info('Creating views collection');
      // Create collection
      return mdb.createCollection(collectionOptions).then((collection) => {
        const builtins = require('./views/index').default;
        logger.info('Populating views collection with standard views',
            Object.keys(builtins).join(', '));
        return collection.create(Object.keys(builtins).map((id) => builtins[id]));
      });
    } else if (status === false) {
      return mdb.updateCollection(collectionOptions);
    } else {
      return Promise.resolve();
    }
  }).then(() => {
    logger.info(`Attaching ${events.pathQueryEvent} event handler`);
    server.on('connection', (socket) => {
      socket.on(`${options.eventBaseName || ''}${events.pathQueryEvent}`, createPathHandler(mdb, socket, options));
    });
  });
};
export default socketHandler;
