import { Module } from './module';

export interface Expression extends Module {
  /**
   * Compiler to compile a string template expression into a hyperobject for
   * the expression component to handle
   *
   * @param expression Expression
   */
  compile?(expression: Array<string>): any
  /**
   * Function to resolve any data create within the expression
   *
   * @param props Properties for the expression
   *
   * @returns The data the expression would add to the data object
   */
  resolve(props): { [id: string]: any };
}
