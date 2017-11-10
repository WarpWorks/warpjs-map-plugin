const Promise = require('bluebird');
const warpjsUtils = require('@warp-works/warpjs-utils');

// const ClickPosition = require('./utilities/click-position');
// const constants = require('./constants');
// const MapMarkerModalPreview = require('./preview-modal');
// const initialize = require('./utilities/initialize');
// const MapUtils = require('./utilities/map-utils');
// const selectRowType = require('./utilities/select-row-type');

const errorTemplate = require('./error.hbs');
const primaryNavigation = require('./primary-navigation');
const template = require('./template.hbs');

(($) => $(document).ready(() => {
    const placeholder = $('#warpjs-content-placeholder');

    return warpjsUtils.getCurrentPageHAL($)
        .then((result) => {
            if (result.error) {
                placeholder.html(errorTemplate(result.data));
            } else {
                return Promise.resolve()
                    .then(() => placeholder.html(template(result.data)))
                    .then(() => primaryNavigation.generateDom($, result.data.columns))
                    .then(() => primaryNavigation.addListeners($))
                    .then(() => primaryNavigation.clickFirst($))
                ;
            }
        })
        .catch((err) => {
            placeholder.html(errorTemplate({
                message: err.message,
                details: err.stack
            }));
        })
    ;
}))(jQuery);

// (($) => {
//     $(document).ready(() => {
//
//         warpjsUtils.getCurrentPageHAL($)
//             .then((result) => {
//                 if (result.error) {
//                 } else {
//                     const mapUtility = new MapUtils(result.data);
//                     const paginationSettings = result.data.paginationSettings;
//                     const columnClickPosition = new ClickPosition(0);
//                     const mapMarkerModalPreview = new MapMarkerModalPreview();
//                     const columnListFirstChild = `${constants.COLUMN_LIST_ITEM}:first-child`;
//
//                     result.data.formattedMap = mapUtility.getFormattedData();
//
//                     placeholder.html(template(result.data));
//
//                     initialize(
//                         $,
//                         mapUtility,
//                         paginationSettings,
//                         columnClickPosition,
//                         $(columnListFirstChild).get(),
//                         mapMarkerModalPreview
//                     );
//
//                     $(constants.MAP_SECTION_BODY)
//                         .on(
//                             "click",
//                             constants.SELECTABLE_LINK_ITEM,
//                             (event) => selectRowType($, mapUtility, paginationSettings, columnClickPosition, mapMarkerModalPreview, event)
//                         )
//                     ;
//                     $(columnListFirstChild).click();
//                 }
//             })
//             .catch((err) => {
//             })
//         ;
//     });
// })(jQuery);
