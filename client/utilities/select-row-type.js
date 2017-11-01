const warpjsUtils = require('@warp-works/warpjs-utils');

const constants = require('./../constants');
const initialize = require('./initialize');
const MapUtils = require('./map-utils');
const paginate = require('./paginate');

const template = require('./../template.hbs');
const errorTemplate = require('./../error.hbs');

function selectRowType($, mapUtilityClass, paginationSettings, clickPosition, mapMarkerModalPreview, event) {
    warpjsUtils.getCurrentPageHAL($, $(event.currentTarget).data('url'))
        .then((result) => {
            if (result.error) {
                $('#warpjs-content-placeholder').html(errorTemplate(result.data));
            } else {
                const activeElementIndex = $(constants.COLUMN_CONTAINER).find(`.${constants.ACTIVE_BUTTON_CLASS_NAME}`).index();
                const currentClickPosition = clickPosition.getClickPosition();
                const currentActiveColumn = mapUtilityClass.getActiveColumn();

                mapUtilityClass = new MapUtils(result.data);
                mapUtilityClass.updateProperties("columns", currentActiveColumn);

                result.data.formattedMap = mapUtilityClass.getFormattedData();

                $('#warpjs-content-placeholder').html(template(result.data));

                initialize(
                    $,
                    mapUtilityClass,
                    paginationSettings,
                    clickPosition,
                    $(constants.COLUMN_CONTAINER).find(constants.LIST_ITEM).get(activeElementIndex),
                    mapMarkerModalPreview
                );

                $(constants.MAP_SECTION_BODY)
                    .on(
                        "click",
                        constants.SELECTABLE_LINK_ITEM,
                        selectRowType.bind(null, $, mapUtilityClass, paginationSettings, clickPosition, mapMarkerModalPreview)
                    );

                const columnItemsList = $(constants.COLUMN_HORIZONTAL_GROUP).find(constants.LIST_ITEM);

                for (let i = 0; i < currentClickPosition; i++) {
                    paginate(paginationSettings, clickPosition, columnItemsList, constants.COLUMN_LIST_PREVIOUS_ARROW, constants.COLUMN_LIST_NEXT_ARROW, "next");
                }
            }
        });
};

module.exports = selectRowType;
