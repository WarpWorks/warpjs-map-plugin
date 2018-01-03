const packageJson = require('./../../package.json');

module.exports = {
    assets: {
        src: [
            'assets'
        ]
    },
    test: {
        src: [
            '.nyc_output',
            'reports'
        ]
    },
    pack: {
        src: [
            `${packageJson.name.replace('@', '').replace('/', '-')}-*.tgz`
        ]
    }
};
