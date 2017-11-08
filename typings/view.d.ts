import * as MDB from 'molten-core';

interface ViewStaticData {
  data: any,
}

interface ViewDynamicData {
  type: string,
  [property: string]: any
}

export type ViewDataProperties = ViewStaticData | ViewDynamicData;

interface ViewElement {
  tag: string,
  attributes?: { [name: string]: any },
  children?: Array<ViewComponent>
}

interface ViewExpression {
  expression: string,
  children: Array<ViewComponent>,
  [prop: string]: any
}

interface ViewForeachExpression extends ViewExpression {
  expression: 'foreach',
  /// Data to iterate through
  data: ViewDataProperties,
  /// ID to use for referencing iterated data
  id: string
}

interface ViewWithExpression extends ViewExpression {
  expression: 'with',
  /// Data to make available
  data: ViewDataProperties,
  /// ID to use for referencing data
  id: string
}

interface Reference {
  $ref: string
}

type ViewComponent = string | Reference | ViewElement | ViewExpression;

/**
 * The paths associated with a view can either be just strings that can
 * contain `:parameters`, or an object with the path, again that can contain
 * `:parameters` and an object of static parameters
 */
type ViewPath = string | {
  path: string,
  parameters?: { [parameter: string]: any }
};

export interface ViewData {
  /// ID of the data that can be used to reference the data in (sub-)views
  [id: string]: {
    /// Type of data it is
    type?: string,
    /// The data, which if not requiring a special handler will be used for
    /// references
    data?: any,
    /// Any additional properties required (Object will be passed to the
    /// special handler if on is required)
    [props: string]: any
  }
}

/**
 * The View interface
 */
export interface View {
  _id: MDB.Id,
  label: MDB.LangString,
  description?: MDB.LangString,
  title?: Array<string | Reference>,
  /// Main view component
  main: Array<ViewComponent>,
  /// Addtional view components used in the view
  views?: { [id: string]: Array<ViewComponent> },
  /// The ID of the template view to use for rendering this view
  template?: MDB.Id,
  /// Data that is associated with the view
  data?: ViewData
  /// Paths to attach the view to
  path?: Array<ViewPath>
}

