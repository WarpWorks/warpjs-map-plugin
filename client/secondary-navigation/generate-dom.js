const constants = require('./constants');
const verticalTemplate = require('./list-items.hbs');

module.exports = ($, items) => {
    const content = verticalTemplate({items});
    $(constants.LIST_ITEMS, constants.CONTAINER).html(content);
};
