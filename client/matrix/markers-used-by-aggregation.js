const coordUsesAggregation = require('./coord-uses-aggregation');

module.exports = (markers, aggregation) => markers.filter(
    (marker) => marker.coordinates.filter((coord) => coordUsesAggregation(coord, aggregation)).length
);
