const Promise = require('bluebird');

const fetchDocuments = require('./fetch-documents');

module.exports = (persistence, config) => {
    const result = [];
    return Promise.resolve(result)
        .then((result) => fetchDocuments(persistence, [ config.domain ], 'domain', result))
        .then((result) => fetchDocuments(persistence, config.columnType, 'column', result))
        .then((result) => fetchDocuments(persistence, config.columnSubType, 'subColumn', result))
        .then((result) => fetchDocuments(persistence, config.rowType, 'row', result))
        .then((result) => fetchDocuments(persistence, config.rowSubType, 'subRow', result))
        .then((result) => fetchDocuments(persistence, config.mapMarker, 'mapMarker', result))
    ;
};
