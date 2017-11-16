const constants = require('./constants');

module.exports = ($, element) => {
    $(constants.LIST_ITEM, constants.LIST_ITEMS).removeClass(constants.SELECTED_CLASS);
    $(element).addClass(constants.SELECTED_CLASS);
};
