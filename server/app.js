const hbs = require('hbs');
const hbsUtils = require('hbs-utils')(hbs);
const express = require('express');
const path = require('path');
const warpjsUtils = require('@warp-works/warpjs-utils');

const routes = require('./routes');

const repoRoot = path.dirname(require.resolve('./../package.json'));

module.exports = (config, warpCore, Persistence, baseUrl, staticUrl) => {
    const app = express();

    baseUrl = (baseUrl === '/') ? '' : baseUrl;

    app.set('view engine', 'hbs');
    app.set('views', warpjsUtils.getHandlebarsViewsDir());

    const handlebarsPartialsDir = warpjsUtils.getHandlebarsPartialsDir();
    hbsUtils.registerWatchedPartials(
        handlebarsPartialsDir,
        {
            precompile: true,
            name: (template) => template.replace(/_/g, '-')
        }
    );

    app.set('base-url', baseUrl);
    app.set('static-url', staticUrl);

    app.use('/assets', express.static(path.join(repoRoot, 'assets')));

    app.use(routes(config, warpCore, Persistence, '/', baseUrl || '/').router);

    return app;
};
