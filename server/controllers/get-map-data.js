const _ = require('lodash');
const Promise = require('bluebird');
const RoutesInfo = require('@quoin/expressjs-routes-info');
const warpjsUtils = require('@warp-works/warpjs-utils');

const data = require('./data');

const PAGINATION_SETTINGS_DEFAULTS = {
    xs: 3,
    sm: 4,
    md: 5,
    lg: 5
};

function mapSettingsReducer(config, memo, defaultValue, paginationKey) {
    return _.extend(memo, {
        [`hidden-${paginationKey}`]: config.paginationSettings[paginationKey] || defaultValue
    });
}

function embedMapMarker(resource, req, mapMarker, id) {
    const subCols = mapMarker.coordinates.filter((coord) => coord.type === "subColumn");
    const subRows = mapMarker.coordinates.filter((coord) => coord.type === "subRow");

    if (subCols.length && subRows.length) {
        const url = RoutesInfo.expand('entity', {
            id: mapMarker.id,
            type: mapMarker.W2Type
        });

        const embeddedResource = warpjsUtils.createResource(url, mapMarker);
        embeddedResource.link("preview", RoutesInfo.expand('entity', {type: mapMarker.W2Type, id: mapMarker.id, preview: true}));
        resource.embed('mapMarkers', embeddedResource);
    }
}

module.exports = (config, warpCore, Persistence, req, res) => {
    const column = (req.params && req.params.column) ? req.params.column : config.mapTypes[0];
    const row = (req.params && req.params.row) ? req.params.row : config.mapTypes.filter((type) => type !== column)[0];

    const publicPrefix = RoutesInfo.expand('W2:app:public');

    return Promise.resolve()
        .then(() => data.getData(config, warpCore, Persistence, column, row))
        .then((results) => {
            const resource = warpjsUtils.createResource(req, _.pick(results, ['columns', 'rows', 'aggregations', 'selectableLinks']));

            // Embed image to columns.
            resource.columns.forEach((column) => {
                if (!column.ImageURL) {
                    const name = column.name.replace(/^(\w+).*/, '$1.jpg');
                    column.ImageURL = `${publicPrefix}/iic_images/map/${name}`;
                }
            });

            resource.paginationSettings = _.reduce(PAGINATION_SETTINGS_DEFAULTS, mapSettingsReducer.bind(null, config), {});

            _.forEach(results.mapMarker, embedMapMarker.bind(null, resource, req));
            warpjsUtils.sendHal(req, res, resource, RoutesInfo);
        })
        .catch(warpjsUtils.sendError.bind(null, req, res, RoutesInfo));
};
