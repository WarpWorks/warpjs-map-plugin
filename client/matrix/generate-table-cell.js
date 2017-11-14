const markersUsedByAggregation = require('./markers-used-by-aggregation');

module.exports = (col, row, intersection) => {
    const markers = markersUsedByAggregation(markersUsedByAggregation(intersection, col), row);
    return {
        colId: col.id,
        rowId: row.id,
        count: markers.length,
        isEmpty: !markers.length,
        isMulti: markers.length > 1,
        markers
    };
};
