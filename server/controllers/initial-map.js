const RoutesInfo = require('@quoin/expressjs-routes-info');
const warpjsUtils = require('@warp-works/warpjs-utils');

const constants = require('./../constants');
const getMapData = require('./get-map-data');

module.exports = (config, warpCore, Persistence, req, res) => {
    warpjsUtils.wrapWith406(res, {
        html: () => {
            warpjsUtils.sendPortalIndex(req, res, RoutesInfo, 'Map',
                [
                    `${req.app.get('base-url')}/assets/${constants.assets.js}`
                ],
                `${req.app.get('base-url')}/assets/${constants.assets.css}`
            );
        },
        [warpjsUtils.constants.HAL_CONTENT_TYPE]: () => {
            getMapData(config, warpCore, Persistence, req, res);
        }
    });
};
