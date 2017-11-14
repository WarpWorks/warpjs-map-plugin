const addActiveClassToRowLists = require('./add-active-class-to-row-lists');
const constants = require('./../constants');

module.exports = ($, mapUtility, type, mapTableTemplate, event) => {
    const elementObject = {
        id: $(event.currentTarget).data('id'),
        name: $(event.currentTarget).text(),
        href: $(event.currentTarget).data('href'),
        imageUrl: $(event.currentTarget).data('bgImgUrl')
    };

    if (type === 'columns') {
    } else {
        const currentTargetIndex = $(event.currentTarget).index();

        $(constants.ROW_LIST_ITEM).removeClass(constants.ACTIVE_BUTTON_CLASS_NAME);
        addActiveClassToRowLists($, constants.ROW_CONTAINER, constants.LIST_ITEM, currentTargetIndex, constants.ACTIVE_BUTTON_CLASS_NAME);
    }

    mapUtility.updateProperties(type, elementObject);
    $('#map-table').html(mapTableTemplate(mapUtility.getFormattedData()));
};
