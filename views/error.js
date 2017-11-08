"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    _id: 'error',
    label: 'Default Error Page',
    description: 'Default error page included in MoltenDB',
    title: [
        { '$ref': 'error' },
        ' Error'
    ],
    main: [
        {
            tag: 'h1',
            children: [
                { '$ref': 'error' },
                ' Error'
            ]
        },
        {
            tag: 'p',
            children: [
                'There has been a ',
                { $ref: 'code' },
                'trying to retrieve this page: ',
                { $ref: 'message' }
            ]
        }
    ],
    ///TODO path: [ 'error' ],
    path: 'error'
};
