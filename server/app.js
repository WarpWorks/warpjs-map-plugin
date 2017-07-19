const express = require('express');
const path = require('path');

const routes = require('./routes');

const projectDir = path.dirname(require.resolve('./../package.json'));

module.exports = (config, warpCore, baseUrl, staticUrl) => {
    const app = express();

    baseUrl = (baseUrl === '/') ? '' : baseUrl;

    app.use('/assets', express.static(path.join(projectDir, 'assets')));

    app.set('base-url', baseUrl);
    app.set('static-url', staticUrl);

    app.use(routes(config, warpCore, '/', baseUrl).router);

    return app;
};
