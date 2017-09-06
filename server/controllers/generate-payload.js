const Promise = require('bluebird');

const convertMapMarkersReln = require('./convert-map-markers-reln');
const convertToResults = require('./convert-to-results');
const converters = require('./converters');
const extractDocuments = require('./extract-documents');
const generateSelectedLinks = require('./generate-selected-links');
const MapError = require('./../error');

module.exports = (persistence, config) => {
    const memo = {
        columns: [],
        rows: [],
        aggregations: {},
        mapMarker: {}
    };

    return Promise.resolve()
        .then(() => extractDocuments(persistence, config))
        .then(
            (documents) => convertToResults(converters, memo, documents),
            (error) => {
                throw new MapError("Cannot extract data from DB", error);
            }
        )
        .then((results) => convertMapMarkersReln(config, results))
        .then((results) => generateSelectedLinks(config, results))
    ;
};
