const pagination = require("./pagination");

module.exports = (paginationSettings, clickPosition, listOfItems, previousArrowClass, nextArrowClass, arrowType, event) => {
    const lastIndex = listOfItems.length - 1;

    pagination.paginate($, paginationSettings, listOfItems, arrowType);
    pagination.hideOrDisplayArrow($, paginationSettings, listOfItems[0], previousArrowClass);
    pagination.hideOrDisplayArrow($, paginationSettings, listOfItems[lastIndex], nextArrowClass);

    clickPosition.updateClickPositionByDirection(arrowType);
};
