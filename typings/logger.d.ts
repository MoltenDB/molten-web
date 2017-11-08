export type DebugLevel = 'debug' | 'info' | 'error' | 'log';

export interface Logger {
  /**
   * Log a message at the given level
   *
   * @param id ID of logging module
   * @param level Log level
   * @param message Data to log
   */
  (id: string, level: DebugLevel, ...message: Array<any>): void;
  /**
   * Set the id of the logging module
   *
   * @param id ID of the logging module.
   * @param noAppend If true, the ID will replace the existing instead of
   *   being appended to it
   */
  id?: (id: string | Array<string>, noAppend?: boolean) => void,
  /**
   * Log a debug message
   *
   * @param message Data to log
   */
  debug: (...message: Array<any>) => void;
  /**
   * Log a info message
   *
   * @param message Data to log
   */
  info: (...message: Array<any>) => void;
  /**
   * Log an error message
   *
   * @param message Data to log
   */
  error: (...message: Array<any>) => void;
  /**
   * Log a message
   *
   * @param message Data to log
   */
  log: (...message: Array<any>) => void;
}

