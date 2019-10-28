const constants = require('./constants');
const itemClicked = require('./item-clicked');
const navigationClicked = require('./navigation-clicked');
const template = require('./navigation-template.hbs');

module.exports = ($, elements) => {
    $(constants.LIST_ITEMS).html(template({ elements }));

    $(constants.LIST_ITEMS).on('click', constants.LIST_ITEM, function(e) {
        e.preventDefault();
        e.stopPropagation();
        itemClicked($, this);
    });

    $(constants.MAP_HEADER).on('click', constants.PAGINATION_NAVIGATION, function(e) {
        e.preventDefault();
        e.stopPropagation();
        navigationClicked($, this);
    });

    $(constants.FIRST_CHILD, constants.LIST_ITEMS).click();
    $(constants.PAGINATION_PREVIOUS, constants.MAP_HEADER).click();
};
