export {
  ViewDataProperties,
  ViewElement
} from './view';

export {
  DebugLevel,
  Logger
} from './logger';

export { DataHandler } from './dataHandler';
export { Expression } from './expression';
export { FunctionLibrary } from './functionLibrary';
export { Module } from './module';

/**
 * Common options that if using the MoltenDB React server-side component
 * will also be passed to the client side component
 */
export interface CommonOptions {
  /**
   * Base URI for URLs in the client app
   */
  baseUri?: string,
  /**
   * Address for molten-api-websocket instance to connect to. If none is
   * provided, molten-web-react will start it's own molten-api-websocket
   * instance
   */
  webSocketAddress?: string,

  /**
   * Base name of events to send to passed molten-api-websocket instance
   */
  eventBaseName?: string,

  /**
   * ID of the collection to use for the storing of views
   */
  viewsCollection: string,

  /**
   * Storage ID to used for the views collection
   */
  viewsCollectionStorage: string
}
