const collection = require('./collection');
const domain = require('./domain');
const entity = require('./entity');

module.exports = {
    domain,
    column: (memo, doc) => entity('columns', memo, doc),
    subColumn: (memo, doc) => collection('aggregations', memo, doc),
    row: (memo, doc) => entity('rows', memo, doc),
    subRow: (memo, doc) => collection('aggregations', memo, doc),
    mapMarker: (memo, doc) => collection('mapMarker', memo, doc)
};
