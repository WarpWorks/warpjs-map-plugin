const constants = require('./constants');

module.exports = ($) => $(`${constants.LIST_ITEM}.${constants.SELECTED_CLASS}`, constants.CONTAINER).get(0);
