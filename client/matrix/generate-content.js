const generateTable = require('./generate-table');

module.exports = ($, col, row) => {
    const colId = $(col).data('id');
    const rowId = $(row).data('id');

    return {
        col: {
            id: colId,
            name: $(col).data('warpjsName'),
            href: $(col).data('href')
        },

        row: {
            id: rowId,
            name: $(row).data('warpjsName'),
            href: $(row).data('href')
        },

        matrix: generateTable($, colId, rowId)
    };
};
