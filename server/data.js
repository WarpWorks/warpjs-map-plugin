const _ = require('lodash');
const Persistence = require('@warp-works/warpjs-mongo-persistence');
const Promise = require('bluebird');
const routesInfo = require('@quoin/expressjs-routes-info');

const {byPositionThenName} = require('@warp-works/warpjs-utils');
const MapError = require('./error');

const PARENT_RELN_NAMES = {};

function domainConverter(memo, doc) {
    return memo;
}

function entityConverter(prop, memo, doc) {
    memo[prop].push(doc);
    return memo;
}

function collectionConverter(prop, memo, doc) {
    memo[prop][doc.id] = doc;
    return memo;
}

function convertDocument(converterMap, memo, doc) {
    return converterMap[doc.type](memo, doc);
}

function convertToResults(converterMap, memo, documents) {
    return documents.reduce(convertDocument.bind(null, converterMap), memo);
}

function parentRelnNameReducer(associations, doc, type, parentRelnName) {
    if (!doc.coordinates) {
        doc.coordinates = [];
    }

    const filteredAssociations = associations.filter((assoc) => assoc.name === parentRelnName);
    const references = filteredAssociations.length ? filteredAssociations[0].getTargetReferences(doc) : [];

    doc.coordinates = doc.coordinates.concat(references.map((reference) => {
        return {
            id: reference._id,
            type,
            desc: reference.desc

        };
    }));

    return doc;
}

function replaceParentRelnName(relationships, doc) {
    return _.reduce(PARENT_RELN_NAMES, parentRelnNameReducer.bind(null, relationships), doc);
}

function convertParentRelnName(domain, memo, doc, id) {
    const entity = domain.getEntityByName(doc.hsType);
    const assocs = entity.getAssociations();

    return _.extend(memo, {
        [id]: replaceParentRelnName(assocs, doc)
    });
}

function convertMapMarkersReln(config, results) {
    const domain = config.domain;
    const extendedMapMarker = _.reduce(results.mapMarker, convertParentRelnName.bind(null, domain), {});

    return _.extend(results, {
        mapMarker: extendedMapMarker
    });
}

function fetchDocuments(persistence, entityArray, type, result) {
    return Promise.reduce(entityArray, (result, entity) => {
        return Promise.resolve()
            .then(() => entity.getDocuments(persistence))
            .then((documents) => {
                documents.forEach((doc) => {
                    _.extend(doc, {
                        name: doc.Name,
                        description: doc.Description,
                        type,
                        hsType: doc.type,
                        href: routesInfo.expand('entity', doc)
                    });
                    delete doc.Name;
                    delete doc.Description;
                    PARENT_RELN_NAMES[doc.parentRelnName] = doc.type;
                    result.push(doc);
                });
                return result;
            });
    }, result);
}

function extractDocuments(config) {
    const persistence = new Persistence(config.host, config.dbName);
    const result = [];
    return Promise.resolve(result)
        .then(fetchDocuments.bind(null, persistence, [config.domain], 'domain'))
        .then(fetchDocuments.bind(null, persistence, config.columnType, 'column'))
        .then(fetchDocuments.bind(null, persistence, config.columnSubType, 'subColumn'))
        .then(fetchDocuments.bind(null, persistence, config.rowType, 'row'))
        .then(fetchDocuments.bind(null, persistence, config.rowSubType, 'subRow'))
        .then(fetchDocuments.bind(null, persistence, config.mapMarker, 'mapMarker'))
        .finally(() => {
            persistence.close();
        });
}

function generateSelectedLinks(config, results) {
    let selectLinks = config.mapTypes
                .filter((type) => type !== config.columnParam && type !== config.rowParam)
                .map((type) => {
                    return {
                        name: type,
                        href: routesInfo.expand('bothTypes', {column: config.columnParam, row: type})
                    };
                });

    results.selectableLinks = {};
    results.selectableLinks.activeSelectedType = config.rowParam;
    results.selectableLinks.selectable = selectLinks;

    return results;
}

function generatePayload(persistenceConfiguration) {
    const converterMap = {
        domain: domainConverter,
        column: entityConverter.bind(null, 'columns'),
        subColumn: collectionConverter.bind(null, 'aggregations'),
        row: entityConverter.bind(null, 'rows'),
        subRow: collectionConverter.bind(null, 'aggregations'),
        mapMarker: collectionConverter.bind(null, 'mapMarker')
    };

    const memo = {
        columns: [],
        rows: [],
        aggregations: {},
        mapMarker: {}
    };

    return extractDocuments(persistenceConfiguration)
        .then(
            convertToResults.bind(null, converterMap, memo),
            (error) => {
                throw new MapError("Cannot extract data from DB", error);
            }
        )
        .then(convertMapMarkersReln.bind(null, persistenceConfiguration))
        .then(generateSelectedLinks.bind(null, persistenceConfiguration));
}

function generatePersistenceConfiguration(dbConfig, warpCore, colType, rowType) {
    const persistenceConfiguration = {};
    const mapMarker = dbConfig.mapMarkerType;
    const domain = warpCore.getDomainByName(dbConfig.domainName);

    persistenceConfiguration.host = dbConfig.persistence.host;
    persistenceConfiguration.dbName = dbConfig.persistence.dbName;
    persistenceConfiguration.mapMarker = [domain.getEntityByName(mapMarker)];

    persistenceConfiguration.domain = domain;
    persistenceConfiguration.columnType = [domain.getEntityByName(colType)];
    persistenceConfiguration.rowType = [domain.getEntityByName(rowType)];

    persistenceConfiguration.columnSubType = [];
    domain.getEntityByName(colType).getAggregations(true).forEach((val) => {
        persistenceConfiguration.columnSubType.push(domain.getEntityByName(val.getTargetEntity().name));
    });

    persistenceConfiguration.rowSubType = [];
    domain.getEntityByName(rowType).getAggregations(true).forEach((val) => {
        persistenceConfiguration.rowSubType.push(domain.getEntityByName(val.getTargetEntity().name));
    });

    persistenceConfiguration.mapTypes = dbConfig.mapTypes;
    persistenceConfiguration.columnParam = colType;
    persistenceConfiguration.rowParam = rowType;

    return persistenceConfiguration;
}

const PROPS_TO_PICK = [
    'ImageUrl',
    'href',
    'hsType',
    'id',
    'name',
    'path',
    'desc',
    'coordinates',
    'type',
    'parentID',
    'Position'
];

function transformDocument(doc) {
    const data = _.pick(doc, PROPS_TO_PICK);
    if (data.Position && (typeof data.Position === 'string')) {
        data.Position = Number.parseInt(data.Position);
    }
    return data;
}

function transformCollectionDocuments(collection) {
    return _.reduce(collection, (memo, doc, entityID) => _.extend(memo, {[entityID]: transformDocument(doc)}), {});
}

function getData(dbConfig, warpCore, column, row) {
    if (column && row && column !== row) {
        const persistenceConfig = generatePersistenceConfiguration(dbConfig, warpCore, column, row);
        return generatePayload(persistenceConfig)
        .then((generatedPayload) => {
            generatedPayload.columns = generatedPayload.columns.map(transformDocument).sort(byPositionThenName);
            generatedPayload.rows = generatedPayload.rows.map(transformDocument).sort(byPositionThenName);
            generatedPayload.aggregations = transformCollectionDocuments(generatedPayload.aggregations);
            generatedPayload.mapMarker = transformCollectionDocuments(generatedPayload.mapMarker);

            return generatedPayload;
        });
    } else {
        throw new MapError("Cannot extract data from DB", "some error");
    }
}

module.exports = {
    getData,
    MapError
};
