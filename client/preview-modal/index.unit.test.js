const testHelpers = require('@quoin/node-test-helpers');
const expect = testHelpers.expect;
const proxyquire = testHelpers.proxyquire.noPreserveCache();

describe('client/utilities/map-marker-modal-preview', () => {
    let stubs;
    let mapMarkerModalPreview;

    beforeEach(() => {
        stubs = {
            './../preview-modal/template.hbs': testHelpers.stub()
        };

        mapMarkerModalPreview = proxyquire.noCallThru().load(require.resolve('./index'), stubs);
    });

    it('should be a function', () => {
        expect(mapMarkerModalPreview).to.be.a('function');
    });
});
