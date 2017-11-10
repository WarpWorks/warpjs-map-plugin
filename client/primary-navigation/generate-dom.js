const _ = require('lodash');

const constants = require('./constants');
const template = require('./../horizontal-menu/template.hbs');

module.exports = ($, elements) => {
    const content = template({elements});
    $(constants.LIST_ITEMS).html(content);

    const listItems = $(constants.LIST_ITEM, constants.LIST_ITEMS);
    _.forIn(constants.ELEMENT_COUNTS, (count, size) => {
        // Display the number of element according to device size
        listItems.slice(0, count).removeClass(`hidden-${size}`);

        // Display the chevrons according to device size
        if (listItems.length > count) {
            $(constants.PAGINATION_NEXT, constants.MAP_HEADER).removeClass(`hidden-${size}`);
        }
    });
};
