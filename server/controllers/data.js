const Promise = require('bluebird');
const {byPositionThenName} = require('@warp-works/warpjs-utils');

const generatePayload = require('./generate-payload');
const generatePersistenceConfig = require('./generate-persistence-config');
const MapError = require('./../error');
const transformCollectionDocuments = require('./transform-collection-documents');
const transformDocument = require('./transform-document');

function getData(dbConfig, warpCore, Persistence, column, row) {
    if (column && row && column !== row) {
        const persistence = new Persistence(dbConfig.persistence.host, dbConfig.persistence.name);

        return Promise.resolve()
            .then(() => generatePersistenceConfig(persistence, dbConfig, warpCore, column, row))
            .then((persistenceConfig) => generatePayload(persistence, persistenceConfig))
            .then((generatedPayload) => {
                generatedPayload.columns = generatedPayload.columns.map(transformDocument).sort(byPositionThenName);
                generatedPayload.rows = generatedPayload.rows.map(transformDocument).sort(byPositionThenName);
                generatedPayload.aggregations = transformCollectionDocuments(generatedPayload.aggregations);
                generatedPayload.mapMarker = transformCollectionDocuments(generatedPayload.mapMarker);

                return generatedPayload;
            })
            .finally(() => persistence.close())
        ;
    } else {
        throw new MapError("Cannot extract data from DB", "some error");
    }
}

module.exports = {
    getData,
    MapError
};
