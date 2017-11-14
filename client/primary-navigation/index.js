const constants = require('./constants');
const generateDom = require('./generate-dom');
const itemClicked = require('./item-clicked');

module.exports = ($, elements) => {
    generateDom($, elements);

    $(constants.LIST_ITEMS).on('click', constants.LIST_ITEM, function(e) {
        itemClicked($, this);
    });

    $(constants.FIRST_CHILD, constants.LIST_ITEMS).click();
};
