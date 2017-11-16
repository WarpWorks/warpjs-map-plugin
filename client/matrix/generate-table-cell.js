const markersUsedByAggregation = require('./markers-used-by-aggregation');

module.exports = (col, row, intersection) => {
    const markers = markersUsedByAggregation(markersUsedByAggregation(intersection, col), row);
    return {
        col,
        row,
        count: markers.length,
        isEmpty: !markers.length,
        isMulti: markers.length > 1,
        markers
    };
};
