import { MoltenWebSocketOptions } from 'molten-api-websocket';
import * as MDB from 'molten-core';

interface PathQuery {
  id: number
  path: string
};

export const createPathHandler = (mdb: MDB.MoltenDBInstance,
    socket: SocketIO.Socket, options: MoltenWebSocketOptions) => {
  if (options.cachePaths) {
  }

  return (data: PathQuery) => {
    console.log('received path query event', data);
    mdb.collection(options.viewsCollection).then(
      (collection) => {
        console.log('got collections collection', collection);
        return collection.read({ path: data.path })
      }
    ).then((results) => {
      console.log('got results',results);
      if (results.length) {
        socket.emit(`${options.eventBaseName || ''}result`, {
          ...data,
          code: 200,
          results: results.raw()
        });
      } else {
        socket.emit(`${options.eventBaseName || ''}result`, {
          id: data.id,
          code: 404
        });
      }
    }).catch((error) => {
      console.log('caught an error', error);
      socket.emit(`${options.eventBaseName || ''}result`, {
        code: 500,
        message: error.message
      });
    });
  }
};
