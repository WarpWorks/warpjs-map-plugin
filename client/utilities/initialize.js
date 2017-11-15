const constants = require('./../constants');
const showMapMarkerListModal = require('./show-map-marker-list-modal');

const modalTemplate = require('./../marker-list-modal/template.hbs');

module.exports = ($, mapUtility, paginationSettings, activeColumnListItem, mapMarkerModalPreview) => {
    $(constants.MAP_SECTION_BODY)
        .on(
            "click",
            constants.MAP_MARKER,
            showMapMarkerListModal.bind(null, $, modalTemplate, mapUtility, constants.MAP_MARKER_MODAL_CONTAINER, constants.MAP_MARKER_MODAL, mapMarkerModalPreview)
        );
};
