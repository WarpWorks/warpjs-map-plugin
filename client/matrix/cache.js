const _ = require('lodash');
const warpjsUtils = require('@warp-works/warpjs-utils');

const markersUsedByAggregation = require('./markers-used-by-aggregation');

const cache = {};

module.exports = {
    init(aggregations, markers) {
        cache.aggregations = _.values(aggregations).sort(warpjsUtils.byPositionThenName);
        cache.markers = [].concat(markers).sort(warpjsUtils.byPositionThenName);
    },

    getAggregations(type, parentId) {
        return cache.aggregations.filter((aggregation) => (aggregation.type === type) && (aggregation.parentID === parentId));
    },

    getAggregationMarkers(aggregations) {
        return aggregations.reduce(
            (memo, aggregation) => memo.concat(markersUsedByAggregation(cache.markers, aggregation)),
            []
        );
    },

    /**
     *  Keep only aggregations that are used in at least one of the markers.
     */
    getActiveAggregations(aggregations, markers) {
        return _.pickBy(aggregations, (aggregation, key) => markersUsedByAggregation(markers, aggregation).length);
    }

};
