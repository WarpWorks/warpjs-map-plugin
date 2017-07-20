const testHelpers = require('@quoin/node-test-helpers');
const expect = testHelpers.expect;
const proxyquire = testHelpers.proxyquire.noPreserveCache();

describe('client/map/lib/utilities/map-utils', () => {
    let stubs;
    let resultData;
    let MapUtils;

    let mapMarkerTreePath;

    beforeEach(() => {
        mapMarkerTreePath = () => [];

        stubs = {};
        stubs['./map-marker-tree'] = mapMarkerTreePath;

        MapUtils = proxyquire.noCallThru().load(require.resolve('./map-utils'), stubs);

        resultData = {};
    });

    it('should be a function', () => {
        expect(MapUtils).to.be.a('function');
    });

    it('should create class when result data is empty', () => {
        const map = new MapUtils(resultData);

        expect(map._cachedResponse).to.deep.equal(resultData);
        expect(map._mapMarkerLookupTree).to.deep.equal([]);
        expect(map._activeColumn).to.deep.equal([]);
        expect(map._activeRow).to.deep.equal([]);
        expect(map._activeSubColumns).to.deep.equal([]);
        expect(map._activeSubRows).to.deep.equal([]);
    });

    it('should create class when result data is not empty', () => {
        resultData = {
            _embedded: {
                mapMarkes: []
            },
            columns: [
                {},
                {}
            ],
            rows: [
                {},
                {}
            ]
        };

        const map = new MapUtils(resultData);

        expect(map._cachedResponse).to.deep.equal(resultData);
        expect(map._mapMarkerLookupTree).to.deep.equal([]);
        expect(map._activeColumn).to.deep.equal({});
        expect(map._activeRow).to.deep.equal({});
        expect(map._activeSubColumns).to.deep.equal([]);
        expect(map._activeSubRows).to.deep.equal([]);
    });

    it('should return a non empty array', () => {
        const matchingAggregationObj = {parentID: 'id1'};
        const notMatchingAggregationObj = {parentID: 'somethingelse'};
        resultData = {
            aggregations: [
                matchingAggregationObj,
                notMatchingAggregationObj,
                matchingAggregationObj,
                notMatchingAggregationObj,
                notMatchingAggregationObj,
                matchingAggregationObj
            ]
        };

        const map = new MapUtils(resultData);

        const filterArray = map.filterAggregationsList({id: 'id1'});

        expect(filterArray.length).to.equal(3);
    });

    it('should return the active column property', () => {
        resultData = {
            columns: [
                {id: 'id1'},
                {id: 'id2'}
            ]
        };

        const map = new MapUtils(resultData);

        expect(map.getActiveColumn()).to.deep.equal({id: 'id1'});
    });

    it('should return the sub columns property', () => {
        const map = new MapUtils(resultData);

        expect(map.getSubColumns()).to.deep.equal([]);
    });

    describe('generateMapMatrix', () => {
        let matchingAggregationObj,
            notMatchingAggregationObj,
            aggregationsArray;
        beforeEach(() => {
            matchingAggregationObj = {
                parentID: 'id1',
                id: 'subId1',
                name: 'aggregate 1',
                href: '/some/dummy/url1'
            };

            notMatchingAggregationObj = {
                parentID: 'id2',
                id: 'subId2',
                name: 'aggregate 2',
                href: '/some/dummy/url2'
            };

            aggregationsArray = [
                matchingAggregationObj,
                notMatchingAggregationObj,
                matchingAggregationObj,
                notMatchingAggregationObj,
                notMatchingAggregationObj,
                matchingAggregationObj
            ];
        });

        it('should return an empty array', () => {
            resultData = {};

            const map = new MapUtils(resultData);
            const mapMatrix = map.generateMapMatrix();

            expect(mapMatrix).to.deep.equal([]);
        });

        it('should return an array - activeSubRows only', () => {
            resultData = {
                rows: [
                    {id: 'id1'},
                    {id: 'id2'}
                ],
                aggregations: aggregationsArray
            };

            const map = new MapUtils(resultData);
            const mapMatrix = map.generateMapMatrix();

            expect(mapMatrix.length).to.equal(3);

            expect(mapMatrix[0][0]).to.deep.equal({name: 'aggregate 1', href: '/some/dummy/url1'});
            expect(mapMatrix[1][0]).to.deep.equal({name: 'aggregate 1', href: '/some/dummy/url1'});
            expect(mapMatrix[2][0]).to.deep.equal({name: 'aggregate 1', href: '/some/dummy/url1'});
        });

        it('should return an array - actitveSubRows and activeSubColumns', () => {
            resultData = {
                columns: [
                    {id: 'id2'},
                    {id: 'id3'}
                ],

                rows: [
                    {id: 'id1'},
                    {id: 'id2'}
                ],
                aggregations: aggregationsArray
            };

            const map = new MapUtils(resultData);

            const mapMatrix = map.generateMapMatrix();

            expect(mapMatrix.length).to.equal(3);
            expect(mapMatrix[0].length).to.deep.equal(4);
            expect(mapMatrix[1].length).to.deep.equal(4);
            expect(mapMatrix[2].length).to.deep.equal(4);
        });

        it('should retuna an array - active subRow and subColumn and map marker tree', () => {
            resultData = {
                columns: [
                    {id: 'id2'},
                    {id: 'id3'}
                ],

                rows: [
                    {id: 'id1'},
                    {id: 'id2'}
                ],
                aggregations: aggregationsArray
            };

            const map = new MapUtils(resultData);
            const mapMarkers = [{name: 'mapMarker 1'}, {name: 'mapMarker 2'}];

            map._mapMarkerLookupTree = {
                subId1: {
                    subId2: mapMarkers
                }
            };

            const mapMatrix = map.generateMapMatrix();

            expect(mapMatrix.length).to.equal(3);
            expect(mapMatrix[0].length).to.deep.equal(4);
            expect(mapMatrix[0][1]).to.deep.equal(mapMarkers);
            expect(mapMatrix[1].length).to.deep.equal(4);
            expect(mapMatrix[1][2]).to.deep.equal(mapMarkers);
            expect(mapMatrix[2].length).to.deep.equal(4);
            expect(mapMatrix[2][3]).to.deep.equal(mapMarkers);
        });
    });

    describe('getFormattedData', () => {
        it('should return an object - result data is empty', () => {
            const map = new MapUtils(resultData);
            const formattedData = map.getFormattedData();

            expect(formattedData.column).to.deep.equal([]);
            expect(formattedData.row).to.deep.equal([]);
            expect(formattedData.columns).to.deep.equal([]);
            expect(formattedData.rows).to.deep.equal([]);
            expect(formattedData.mapMatrix.subColumnHeaders).to.deep.equal([]);
            expect(formattedData.mapMatrix.subRows).to.deep.equal([]);
        });

        it('should return and object - result data is not empty', () => {
            resultData = {
                columns: [{}],
                rows: [{}]
            };

            const map = new MapUtils(resultData);
            const formattedData = map.getFormattedData();

            expect(formattedData.column).to.deep.equal({});
            expect(formattedData.row).to.deep.equal({});
            expect(formattedData.columns).to.deep.equal([{}]);
            expect(formattedData.rows).to.deep.equal([{}]);
            expect(formattedData.mapMatrix.subColumnHeaders).to.deep.equal([]);
            expect(formattedData.mapMatrix.subRows).to.deep.equal([]);
        });
    });

    describe('updateProperties', () => {
        it('should set the active column and sub columns property', () => {
            const map = new MapUtils(resultData);

            map.updateProperties('columns', {name: 'column identifier'});

            expect(map._activeColumn).to.deep.equal({name: 'column identifier'});
            expect(map._activeSubColumns).to.deep.equal([]);
        });

        it('should set the active row and sub rows property', () => {
            const map = new MapUtils(resultData);

            map.updateProperties('rows', {name: 'row identifier'});

            expect(map._activeRow).to.deep.equal({name: 'row identifier'});
            expect(map._activeSubRows).to.deep.equal([]);
        });
    });

    it('should throw an error because nothing was passed to the constructor', () => {
        /*eslint-disable*/
        expect(() => {
            new MapUtils();
        }).to.throw(Error);
        /*eslint-enable*/
    });

    it('should throw an error because null and undefined can not be parameters to the constructor', () => {
        /*eslint-disable*/
        expect(() => {
            new MapUtils(null);
        }).to.throw(Error);
        expect(() => {
            new MapUtils(undefined);
        }).to.throw(Error);
        /*eslint-enable*/
    });
});
