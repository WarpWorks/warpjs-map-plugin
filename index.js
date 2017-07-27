const app = require('./server/app');

module.exports = (config, warpCore, Persistence) => {
    return app.bind(null, config, warpCore, Persistence);
};
