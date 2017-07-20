const $ = require('jquery');
const testHelpers = require('@quoin/node-test-helpers');

const expect = testHelpers.expect;
const stub = testHelpers.stub;
const proxyquire = testHelpers.proxyquire.noPreserveCache();

describe('client/map/lib/utilities/initialize-pagination-styles', () => {
    let stubs;
    let paginationPath;
    let initializePaginationStyles;

    beforeEach(() => {
        paginationPath = {
            generateInitialElementStyles: stub(),
            hideOrDisplayArrow: stub()
        };
        stubs = {};

        stubs['./pagination'] = paginationPath;

        initializePaginationStyles = proxyquire.noCallThru().load(require.resolve('./initialize-pagination-styles'), stubs);
    });

    it('should be a function', () => {
        expect(initializePaginationStyles).to.be.a('function');
    });

    it('should call pagination methods', () => {
        initializePaginationStyles($, $('test-class'), "someclass1", "someclass2", "somesettings");

        expect(paginationPath.generateInitialElementStyles).to.have.callCount(1);
        expect(paginationPath.hideOrDisplayArrow).to.have.callCount(2);
    });

    it('should throw an error because the list needs to be an array', () => {
        expect(initializePaginationStyles.bind(null, $)).not.to.throw(Error);
        expect(initializePaginationStyles.bind(null, $, null)).not.to.throw(Error);
        expect(initializePaginationStyles.bind(null, $, undefined)).not.to.throw(Error);
        expect(initializePaginationStyles.bind(null, $, '')).not.to.throw(Error);
        expect(initializePaginationStyles.bind(null, $, true)).not.to.throw(Error);
        expect(initializePaginationStyles.bind(null, $, false)).not.to.throw(Error);
        expect(initializePaginationStyles.bind(null, $, {})).not.to.throw(Error);
        expect(initializePaginationStyles.bind(null, $, 1)).not.to.throw(Error);
    });
});
