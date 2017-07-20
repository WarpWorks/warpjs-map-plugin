const testHelpers = require('@quoin/node-test-helpers');
const expect = testHelpers.expect;

function isMapCoordinatePopulated(treeObject, rowKey, colKey, mapMarkerIndex, expectedValue) {
    const rowObject = treeObject[rowKey];
    const colObject = rowObject[colKey];
    const mapMarkers = colObject[mapMarkerIndex];

    expect(mapMarkers.coordinates).to.deep.equal(expectedValue);
}

describe('client/map/lib/utilities/map-marker-tree', () => {
    let mapMarkerTree;
    let mmArray;
    let coordinates1, coordinates2, coordinates3, coordinates4;
    let col1, col2, col3, col4, col5, col6;
    let row1, row2, row3, row4, row5, row6;
    beforeEach(() => {
        mapMarkerTree = require('./map-marker-tree');

        mmArray = [];

        coordinates1 = [];
        coordinates2 = [];
        coordinates3 = [];
        coordinates4 = [];

        col1 = {id: 'col1', type: 'subColumn'};
        col2 = {id: 'col2', type: 'subColumn'};
        col3 = {id: 'col3', type: 'subColumn'};
        col4 = {id: 'col4', type: 'subColumn'};
        col5 = {id: 'col5', type: 'subColumn'};
        col6 = {id: 'col6', type: 'subColumn'};

        row1 = {id: 'row1', type: 'subRow'};
        row2 = {id: 'row2', type: 'subRow'};
        row3 = {id: 'row3', type: 'subRow'};
        row4 = {id: 'row4', type: 'subRow'};
        row5 = {id: 'row5', type: 'subRow'};
        row6 = {id: 'row6', type: 'subRow'};

        coordinates1.push(col1);
        coordinates1.push(col2);
        coordinates1.push(col4);
        coordinates1.push(row3);
        coordinates1.push(row5);

        coordinates2.push(col6);
        coordinates2.push(row1);
        coordinates2.push(row4);

        coordinates3.push(col3);
        coordinates3.push(col4);
        coordinates3.push(col5);
        coordinates3.push(col6);
        coordinates3.push(row1);
        coordinates3.push(row2);
        coordinates3.push(row4);
        coordinates3.push(row6);

        mmArray.push({coordinates: coordinates1});
        mmArray.push({coordinates: coordinates2});
        mmArray.push({coordinates: coordinates3});
        mmArray.push({coordinates: coordinates4});
    });

    it('should be a function', () => {
        expect(mapMarkerTree).to.be.a('function');
    });

    it('should create a matrix object that maps all rows and columns', () => {
        const formattedMapMarkerObj = mapMarkerTree(mmArray);

        isMapCoordinatePopulated(formattedMapMarkerObj, "row1", "col3", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row1", "col4", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row1", "col5", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row1", "col6", 0, coordinates2);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row1", "col6", 1, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row2", "col3", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row2", "col4", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row2", "col5", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row2", "col6", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row3", "col1", 0, coordinates1);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row3", "col2", 0, coordinates1);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row3", "col4", 0, coordinates1);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row4", "col3", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row4", "col4", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row4", "col5", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row4", "col6", 0, coordinates2);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row4", "col6", 1, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row5", "col1", 0, coordinates1);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row5", "col2", 0, coordinates1);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row5", "col4", 0, coordinates1);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row6", "col3", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row6", "col4", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row6", "col5", 0, coordinates3);
        isMapCoordinatePopulated(formattedMapMarkerObj, "row6", "col6", 0, coordinates3);
    });
});
