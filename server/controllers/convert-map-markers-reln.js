const _ = require('lodash');

const convertParentRelnName = require('./convert-parent-reln-name');

module.exports = (config, results) => {
    const domain = config.domain;
    const extendedMapMarker = _.reduce(results.mapMarker, convertParentRelnName.bind(null, domain), {});

    return _.extend(results, {
        mapMarker: extendedMapMarker
    });
};
