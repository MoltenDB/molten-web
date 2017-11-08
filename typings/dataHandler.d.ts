import * as View from './view';
import { Module } from './module';

export interface Parameters {
  /// Number of items to fetch
  limit?: number;
  /// First item to fetch (skip first start - 1)
  start?: number,
  /// Number of items to download in each batch
  batch?: number
}

export interface DataHandler extends Module {
  /**
   * Resolve the given path using the data handler
   *
   * @param properties Properties of the data
   * @param dataPath Path to data from top view
   * @param path Path to resolve
   * @param parameters Parameters passed to the data handler
   */
  resolve(properties: View.ViewData, dataPath: Array<string>,
      path: Array<string>, parameters: Parameters): any;
}
