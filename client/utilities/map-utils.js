const _ = require('lodash');
const warpjsUtils = require('@warp-works/warpjs-utils');

const mapMarkerTree = require('./map-marker-tree');

class MapUtils {
    constructor(dataSet) {
        this._cachedResponse = _.cloneDeep(dataSet);
        this._mapMarkerLookupTree = this._cachedResponse._embedded && this._cachedResponse._embedded.mapMarkers ? mapMarkerTree(this._cachedResponse._embedded.mapMarkers) : [];
        this._activeColumn = (this._cachedResponse.columns && this._cachedResponse.columns.length) ? this._cachedResponse.columns[0] : [];
        this._activeRow = (this._cachedResponse.rows && this._cachedResponse.rows.length) ? this._cachedResponse.rows[0] : [];
        this._activeSubColumns = this.filterAggregationsList(this._activeColumn);
        this._activeSubRows = this.filterAggregationsList(this._activeRow);
    }

    filterAggregationsList(obj) {
        return ((obj && obj.id)
            ? _.filter(this._cachedResponse.aggregations, (item) => item.parentID === obj.id)
            : []).sort(warpjsUtils.byPositionThenName);
    };

    getActiveColumn() {
        return this._activeColumn;
    }

    getSubColumns() {
        return this._activeSubColumns;
    }

    getSubRows() {
        return this._activeSubRows;
    }

    generateMapMatrix() {
        const map = _.reduce(this._activeSubRows, (outerResult, rowValue, rowKey) => {
            const row = [];
            const rowFirstCell = {name: rowValue.name, href: rowValue.href};
            const grid = _.reduce(this._activeSubColumns, (innerResult, colValue, colKey) => {
                if (
                    this._mapMarkerLookupTree &&
                        this._mapMarkerLookupTree[this._activeSubRows[rowKey].id] &&
                        this._mapMarkerLookupTree[this._activeSubRows[rowKey].id][this._activeSubColumns[colKey].id]
                ) {
                    innerResult.push(this._mapMarkerLookupTree[this._activeSubRows[rowKey].id][this._activeSubColumns[colKey].id]);
                } else {
                    innerResult.push([]);
                }

                return innerResult;
            }, []);

            outerResult.push(_.concat(row, rowFirstCell, grid));
            return outerResult;
        }, []);
        return map;
    };

    getFormattedData() {
        return {
            column: this._activeColumn,
            row: this._activeRow,
            columns: this._cachedResponse.columns ? this._cachedResponse.columns : [],
            rows: this._cachedResponse.rows ? this._cachedResponse.rows : [],
            mapMatrix: {
                subColumnHeaders: this._activeSubColumns,
                subRows: this.generateMapMatrix()
            }
        };
    };

    updateProperties(type, elementObject) {
        const filteredList = this.filterAggregationsList(elementObject);

        if (type === 'columns') {
            this._activeColumn = elementObject;
            this._activeSubColumns = filteredList;
        } else {
            this._activeRow = elementObject;
            this._activeSubRows = filteredList;
        }
    };
}

module.exports = MapUtils;
