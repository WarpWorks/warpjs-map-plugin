const addActiveClassToRowLists = require('./add-active-class-to-row-lists');
const changeBackGroundImage = require('./../horizontal-menu/change-background-image');
const constants = require('./../constants');

module.exports = ($, mapUtility, type, mapTableTemplate, event) => {
    const elementObject = {
        id: $(event.currentTarget).data('id'),
        name: $(event.currentTarget).text(),
        href: $(event.currentTarget).data('href'),
        imageUrl: $(event.currentTarget).data('bgImgUrl')
    };

    if (type === 'columns') {
        const elementToRemoveClass = $(event.currentTarget).parent(constants.HORIZONTAL_GROUP_CONTAINER).find(constants.LIST_ITEM);

        $(elementToRemoveClass).removeClass(constants.ACTIVE_BUTTON_CLASS_NAME);
        $(event.currentTarget).addClass(constants.ACTIVE_BUTTON_CLASS_NAME);

        changeBackGroundImage($, $(constants.MAP_SECTION_HEAD), elementObject.imageUrl);
        $(constants.MAP_IMAGE_LABEL_TEXT).text($(event.currentTarget).text());
    } else {
        const currentTargetIndex = $(event.currentTarget).index();

        $(constants.ROW_LIST_ITEM).removeClass(constants.ACTIVE_BUTTON_CLASS_NAME);
        addActiveClassToRowLists($, constants.ROW_CONTAINER, constants.LIST_ITEM, currentTargetIndex, constants.ACTIVE_BUTTON_CLASS_NAME);
    }

    mapUtility.updateProperties(type, elementObject);
    $('#map-table').html(mapTableTemplate(mapUtility.getFormattedData()));
};
