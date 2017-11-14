const constants = require('./constants');
const generateDom = require('./generate-dom');
const itemClicked = require('./item-clicked');

module.exports = ($, elements) => {
    generateDom($, elements);

    $(constants.CONTAINER).on('click', constants.LIST_ITEM, function(e) {
        itemClicked($, this);
    });

    $(constants.FIRST_CHILD, constants.CONTAINER).click();
};
