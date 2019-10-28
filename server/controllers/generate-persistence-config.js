const Promise = require('bluebird');

module.exports = (dbConfig, warpCore, colType, rowType) => Promise.resolve()
    .then(() => warpCore.getDomainByName(dbConfig.domainName))
    .then((domain) => ({
        mapMarker: [ domain.getEntityByName(dbConfig.mapMarkerType) ],

        domain,
        columnType: [ domain.getEntityByName(colType) ],
        rowType: [ domain.getEntityByName(rowType) ],

        columnSubType: domain.getEntityByName(colType).getAggregations(true).map((val) => val.getTargetEntity()),
        rowSubType: domain.getEntityByName(rowType).getAggregations(true).map((val) => val.getTargetEntity()),

        mapTypes: dbConfig.mapTypes,
        columnParam: colType,
        rowParam: rowType
    }))
;
