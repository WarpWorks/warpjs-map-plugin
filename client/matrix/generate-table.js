const _ = require('lodash');

const cache = require('./cache');
const generateTableCell = require('./generate-table-cell');
const generateTableHeaderCell = require('./generate-table-header-cell');

const EMPTY_HEADER = {
    isHeader: true,
    isEmpty: true
};

module.exports = ($, colId, rowId) => {
    const subCols = cache.getAggregations('subColumn', colId);
    const subRows = cache.getAggregations('subRow', rowId);

    const colMarkers = cache.getAggregationMarkers(subCols);
    const rowMarkers = cache.getAggregationMarkers(subRows);
    const intersection = _.intersection(colMarkers, rowMarkers);

    // Only keep found cols and rows.
    const activeSubCols = _.values(cache.getActiveAggregations(subCols, intersection));
    const activeSubRows = _.values(cache.getActiveAggregations(subRows, intersection));

    if (intersection.length) {
        const table = [];

        // Column header row
        // [null] for top left corner cell empty.
        table.push([EMPTY_HEADER].concat(activeSubCols.map((subCol) => generateTableHeaderCell(subCol))));

        activeSubRows.forEach((subRow) => {
            table.push([generateTableHeaderCell(subRow)].concat(activeSubCols.map((subCol) => generateTableCell(subCol, subRow, intersection))));
        });

        return table;
    } else {
        return null;
    }
};
