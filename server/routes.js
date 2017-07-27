const RoutesInfo = require('@quoin/expressjs-routes-info');

const controllers = require('./controllers');

module.exports = (config, warpCore, Persistence, subPath, baseUrl) => {
    const routesInfo = new RoutesInfo(subPath, baseUrl);

    routesInfo.route('W2:plugin:map:main', '/')
        .get(controllers.initialMap.bind(null, config, warpCore, Persistence));

    routesInfo.route('W2:plugin:map:column', '/{column}')
        .get(controllers.initialMap.bind(null, config, warpCore, Persistence));

    routesInfo.route('W2:plugin:map:column-row', '/{column}/{row}')
        .get(controllers.initialMap.bind(null, config, warpCore, Persistence));

    return routesInfo;
};
