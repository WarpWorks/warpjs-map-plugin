const addActiveClassToRowLists = require('./add-active-class-to-row-lists');
const changeBackGroundImage = require('./../horizontal-menu/change-background-image');
const constants = require('./../constants');
const initializePaginationStyles = require('./initialize-pagination-styles');
const paginate = require('./paginate');
const showMapMarkerListModal = require('./show-map-marker-list-modal');
const updateInnerGrid = require('./update-inner-grid');

const modalTemplate = require('./../marker-list-modal/template.hbs');
const mapTableTemplate = require('./../marker-table/template.hbs');

module.exports = ($, mapUtility, paginationSettings, clickPosition, activeColumnListItem, mapMarkerModalPreview) => {
    const arrowTypePrevious = "previous";
    const arrowTypeNext = "next";
    const columnItemsList = $(constants.COLUMN_HORIZONTAL_GROUP).find(constants.LIST_ITEM);
    const rowItemsList = $(constants.ROW_HORIZONTAL_GROUP).find(constants.LIST_ITEM);

    clickPosition.setClickPosition(0);

    $(activeColumnListItem).addClass(constants.ACTIVE_BUTTON_CLASS_NAME);
    $(constants.MAP_IMAGE_LABEL_TEXT).text($(activeColumnListItem).text());
    changeBackGroundImage($, constants.MAP_SECTION_HEAD, $(activeColumnListItem).data('bgImgUrl'));
    addActiveClassToRowLists($, constants.ROW_CONTAINER, constants.LIST_ITEM, 0, constants.ACTIVE_BUTTON_CLASS_NAME);
    initializePaginationStyles($, columnItemsList, constants.COLUMN_LIST_PREVIOUS_ARROW, constants.COLUMN_LIST_NEXT_ARROW, paginationSettings);
    initializePaginationStyles($, rowItemsList, constants.ROW_LIST_PREVIOUS_ARROW, constants.ROW_LIST_NEXT_ARROW, paginationSettings);

    $(constants.MAP_SECTION_HEAD)
        .on(
            "click",
            constants.COLUMN_LIST_ITEM,
            updateInnerGrid.bind(null, $, mapUtility, "columns", mapTableTemplate)
        )
        .on(
            "click",
            constants.COLUMN_LIST_PREVIOUS_ARROW,
            paginate.bind(null, paginationSettings, clickPosition, columnItemsList, constants.COLUMN_LIST_PREVIOUS_ARROW, constants.COLUMN_LIST_NEXT_ARROW, arrowTypePrevious)
        )
        .on("click",
            constants.COLUMN_LIST_NEXT_ARROW,
            paginate.bind(null, paginationSettings, clickPosition, columnItemsList, constants.COLUMN_LIST_PREVIOUS_ARROW, constants.COLUMN_LIST_NEXT_ARROW, arrowTypeNext)
        );

    $(constants.MAP_SECTION_BODY)
        .on(
            "click",
            constants.ROW_LIST_ITEM,
            updateInnerGrid.bind(null, $, mapUtility, "rows", mapTableTemplate)
        )
        .on(
            "click",
            constants.ROW_LIST_PREVIOUS_ARROW,
            paginate.bind(null, paginationSettings, clickPosition, rowItemsList, constants.ROW_LIST_PREVIOUS_ARROW, constants.ROW_LIST_NEXT_ARROW, arrowTypePrevious)
        )
        .on(
            "click",
            constants.ROW_LIST_NEXT_ARROW,
            paginate.bind(null, paginationSettings, clickPosition, rowItemsList, constants.ROW_LIST_PREVIOUS_ARROW, constants.ROW_LIST_NEXT_ARROW, arrowTypeNext)
        )
        .on(
            "click",
            constants.MAP_MARKER,
            showMapMarkerListModal.bind(null, $, modalTemplate, mapUtility, constants.MAP_MARKER_MODAL_CONTAINER, constants.MAP_MARKER_MODAL, mapMarkerModalPreview)
        );
};
