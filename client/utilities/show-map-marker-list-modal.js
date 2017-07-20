const _ = require("lodash");

module.exports = ($, modalTemplate, mapUtility, modalContainerID, modalContainer, mapMarkerModalPreview, event) => {
    const matrixRow = $(event.currentTarget).data('rowIndex');
    const matrixColumn = $(event.currentTarget).data('coordinateIndex');

    const mapMarkersAtCoordinates = mapUtility.getFormattedData().mapMatrix.subRows.length &&
                                    mapUtility.getFormattedData().mapMatrix.subRows[matrixRow].length
        ? mapUtility.getFormattedData().mapMatrix.subRows[matrixRow][matrixColumn]
        : [];

    const activeSubRow = mapUtility.getSubRows()[matrixRow];
    const tooltip = {};
    mapMarkersAtCoordinates.forEach((doc) => {
        const activeRow = _.filter(doc.coordinates, (coordinate) => coordinate.id === activeSubRow.id);
        if (activeRow.length && !tooltip[activeRow[0].id]) {
            tooltip[activeRow[0].id] = activeRow[0].desc;
        }
    });
    const text = tooltip[activeSubRow.id] ? tooltip[activeSubRow.id] : '';
    const modalTemplateObject = {
        tooltip: text,
        activeSubColumn: mapUtility.getSubColumns()[matrixColumn - 1],
        activeSubRow,
        mapMarkers: mapMarkersAtCoordinates
    };

    $(modalContainerID).html(modalTemplate(modalTemplateObject));
    $(modalContainer)
        .on('click', '.toggler', mapMarkerModalPreview.toggle.bind(mapMarkerModalPreview, $))
        .modal('show');
};
