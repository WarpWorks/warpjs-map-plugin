const warpjsUtils = require('@warp-works/warpjs-utils');

const getMapData = require('./get-map-data');

module.exports = (config, warpCore, Persistence, req, res) => {
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
            getMapData(config, warpCore, Persistence, req, res);
        }
    });
};
