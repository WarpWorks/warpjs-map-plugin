const warpjsUtils = require('@warp-works/warpjs-utils');

const ClickPosition = require('./utilities/click-position');
const constants = require('./constants');
const MapMarkerModalPreview = require('./preview-modal');
const initialize = require('./utilities/initialize');
const MapUtils = require('./utilities/map-utils');
const selectRowType = require('./utilities/select-row-type');

const template = require('./template.hbs');
const errorTemplate = require('./error.hbs');

(($) => {
    $(document).ready(() => {
        warpjsUtils.getCurrentPageHAL($)
            .then((result) => {
                if (result.error) {
                    $('#warpjs-content-placeholder').html(errorTemplate(result.data));
                } else {
                    const mapUtility = new MapUtils(result.data);
                    const paginationSettings = result.data.paginationSettings;
                    const columnClickPosition = new ClickPosition(0);
                    const mapMarkerModalPreview = new MapMarkerModalPreview();
                    const columnListFirstChild = `${constants.COLUMN_LIST_ITEM}:first-child`;

                    result.data.formattedMap = mapUtility.getFormattedData();

                    $('#warpjs-content-placeholder').html(template(result.data));

                    initialize(
                        $,
                        mapUtility,
                        paginationSettings,
                        columnClickPosition,
                        $(columnListFirstChild).get(),
                        mapMarkerModalPreview
                    );

                    $(constants.MAP_SECTION_BODY)
                        .on(
                            "click",
                            constants.SELECTABLE_LINK_ITEM,
                            selectRowType.bind(null, $, mapUtility, paginationSettings, columnClickPosition, mapMarkerModalPreview)
                        );
                }
            });
    });
})(jQuery);
