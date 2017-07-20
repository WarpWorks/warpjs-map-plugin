const _ = require('lodash');

module.exports = (mapMarkerArray) => {
    const tree = {};
    _.forEach(mapMarkerArray, (mapMarkerVal) => {
        const cols = _.filter(mapMarkerVal.coordinates, (obj) => {
            return obj.type === 'subColumn';
        });

        const rows = _.filter(mapMarkerVal.coordinates, (obj) => {
            return obj.type === 'subRow';
        });

        _.forEach(rows, (rowVal, rowKey) => {
            _.forEach(cols, (colVal, colKey) => {
                if (!tree[rowVal.id]) {
                    tree[rowVal.id] = {};
                }
                if (!tree[rowVal.id][colVal.id]) {
                    tree[rowVal.id][colVal.id] = [];
                }
                tree[rowVal.id][colVal.id].push(mapMarkerVal);
            });
        });
    });
    return tree;
};
