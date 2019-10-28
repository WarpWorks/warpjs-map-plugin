const _ = require('lodash');

const transformDocument = require('./transform-document');

module.exports = (collection) => {
    return _.reduce(collection, (memo, doc, entityID) => _.extend(memo, { [entityID]: transformDocument(doc) }), {});
};
