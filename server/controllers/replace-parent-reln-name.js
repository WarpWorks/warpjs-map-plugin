const _ = require('lodash');

const PARENT_RELN_NAMES = require('./parent-reln-names');
const parentRelnNameReducer = require('./parent-reln-name-reducer');

module.exports = (relationships, doc) => {
    return _.reduce(PARENT_RELN_NAMES, parentRelnNameReducer.bind(null, relationships), doc);
};
