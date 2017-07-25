const _ = require('lodash');
// const debug = require('debug')('W2:plugin:map:server:controllers');
const routesInfo = require('@quoin/expressjs-routes-info');

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
        const url = routesInfo.expand('entity', {
            id: mapMarker.id,
            type: mapMarker.hsType
        });

        const embeddedResource = warpjsUtils.createResource(url, mapMarker);
        embeddedResource.link("preview", routesInfo.expand('entity', {type: mapMarker.hsType, id: mapMarker.id, preview: true}));
        resource.embed('mapMarkers', embeddedResource);
    }
}

function getMapData(config, warpCore, req, res) {
    const column = (req.params && req.params.column) ? req.params.column : config.mapTypes[0];
    const row = (req.params && req.params.row) ? req.params.row : config.mapTypes.filter((type) => type !== column)[0];

    return data.getData(config, warpCore, column, row)
        .then((results) => {
            const resource = warpjsUtils.createResource(req, _.pick(results, ['columns', 'rows', 'aggregations', 'selectableLinks']));

            // Embed image to columns.
            resource.columns.forEach((column) => {
                if (!column.ImageURL) {
                    const name = column.name.replace(/^(\w+).*/, '$1.jpg');
                    column.ImageURL = `/public/iic_images/map/${name}`;
                }
            });

            // FIXME: The selectable links should have been under _embedded and
            // contain all possible entries:
            //
            //  {
            //    _embedded: {
            //      selectableLinks: [{
            //        name: "name1",
            //        selected: true,
            //        _links: {
            //          self: {
            //            href: '...'
            //          }
            //        }
            //      }, {
            //        name: "name2",
            //        selected: false,
            //        _links: {
            //          self: {
            //            href: '...'
            //          }
            //        }
            //      }, {
            //        ...
            //      }]
            //    }
            //  }
            // Embed row links
            // debug(`selectableLinks:`, results.selectableLinks);

            resource.paginationSettings = _.reduce(PAGINATION_SETTINGS_DEFAULTS, mapSettingsReducer.bind(null, config), {});

            _.forEach(results.mapMarker, embedMapMarker.bind(null, resource, req));
            warpjsUtils.sendHal(req, res, resource, routesInfo);
        })
        .catch(warpjsUtils.sendError.bind(null, req, res));
}

function initialMap(config, warpCore, req, res) {
    warpjsUtils.wrapWith406(res, {
        html: () => {
            warpjsUtils.sendIndex(res, 'Map',
                [
                    `${req.app.get('base-url')}/assets/vendor.min.js`,
                    `${req.app.get('base-url')}/assets/map.min.js`
                ],
                `${req.app.get('base-url')}/assets/style.min.css`
            );
        },
        [warpjsUtils.constants.HAL_CONTENT_TYPE]: () => {
            getMapData(config, warpCore, req, res);
        }
    });
}

module.exports = {
    initialMap
};
