const app = require('./server/app');

module.exports = (config, warpCore) => {
    return app.bind(null, config, warpCore);
};
