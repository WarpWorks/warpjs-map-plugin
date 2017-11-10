const constants = require('./constants');

const className = 'active-outer-button';

module.exports = ($, element) => {
    $(constants.LIST_ITEM, constants.LIST_ITEMS).removeClass(className);
    $(element).addClass(className);
};
