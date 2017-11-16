const Promise = require('bluebird');

const matrix = require('./../matrix');
const updateSelection = require('./update-selection');

module.exports = ($, element) => Promise.resolve()
    .then(() => updateSelection($, element))
    .then(() => matrix.update($))
;
