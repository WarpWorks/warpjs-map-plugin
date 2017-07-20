const pagination = require("./pagination");

module.exports = ($, arrayOfItems, previousArrowClass, nextArrowClass, paginationSettings) => {
    if (arrayOfItems instanceof $) {
        const lastIndex = arrayOfItems.length - 1;
        pagination.generateInitialElementStyles($, paginationSettings, arrayOfItems);
        pagination.hideOrDisplayArrow($, paginationSettings, arrayOfItems[0], previousArrowClass);
        pagination.hideOrDisplayArrow($, paginationSettings, arrayOfItems[lastIndex], nextArrowClass);
    }
};
