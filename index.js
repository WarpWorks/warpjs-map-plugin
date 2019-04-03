const app = require('./server/app');

module.exports = (config, warpCore, Persistence) => (baseUrl, staticUrl) => app(config, warpCore, Persistence, baseUrl, staticUrl);
