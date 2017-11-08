import * as MDB from 'molten-core';

export interface Module {
  /// ID for the module
  id: string;
  /// Name label for the module
  name: string;
  /// Description of the module
  description: string;
  /// Options available for the module
  options?: MDB.Options
}
