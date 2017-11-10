const constants = require('./constants');
const generateDom = require('./generate-dom');
const updateImage = require('./update-image');
const updateSelection = require('./update-selection');
const matrix = require('./../matrix');
const updateTitle = require('./update-title');

module.exports = {
    generateDom($, elements) {
        generateDom($, elements);
    },

    addListeners($) {
        $(constants.LIST_ITEMS).on('click', constants.LIST_ITEM, function(e) {
            return Promise.resolve()
                .then(() => updateSelection($, this))
                .then(() => updateTitle($, this))
                .then(() => updateImage($, this))
                .then(() => matrix.update($))
            ;
        });
    },

    clickFirst($) {
        $(constants.FIRST_CHILD, constants.LIST_ITEMS).click();
    }
};
