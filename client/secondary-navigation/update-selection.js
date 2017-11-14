const constants = require('./constants');

module.exports = ($, element) => {
    $(constants.LIST_ITEM, constants.CONTAINER).removeClass(constants.SELECTED_CLASS);
    $(element).addClass(constants.SELECTED_CLASS);

    // TODO: Update both horizontal and vertical navigation.
};
