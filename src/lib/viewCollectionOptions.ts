import * as MDB from 'molten-core';

export const collectionOptions: MDB.CollectionOptions = {
  label: 'Views',
  description: 'Collection storing views',
  fields: {
    _id: {
      type: 'string',
      required: true
    },
    label: {
      type: 'string',
      label: 'View Title'
    },
    description: {
      type: 'string'
    },
    title: {
      type: 'string',
      required: true
    },
    template: {
      type: 'string' // ID lookup
    },
    data: {
      type: 'generic',
      multiple: true,
      object: true
    },
    views: {
      type: 'generic',
      multiple: true,
      object: true
    },
    main: {
      type: 'generic',
      required: true
    },
    path: {
      type: 'string',
      multiple: true
    }
  }
};
export default collectionOptions;
