const constants = require('./../../server/constants');

module.exports = {
    default: {
        options: {
            compress: true
        },
        files: [{
            src: 'client/style.less',
            dest: `assets/${constants.assets.css}`
        }]
    }
};
