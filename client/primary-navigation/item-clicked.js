const Promise = require('bluebird');

const matrix = require('./../matrix');
const updateImage = require('./update-image');
const updateSelection = require('./update-selection');
const updateTitle = require('./update-title');

module.exports = ($, element) => Promise.resolve()
    .then(() => updateSelection($, element))
    .then(() => updateTitle($, element))
    .then(() => updateImage($, element))
    .then(() => matrix.update($))
;
