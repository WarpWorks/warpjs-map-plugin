const testHelpers = require('@quoin/node-test-helpers');
const expect = testHelpers.expect;
const proxyquire = testHelpers.proxyquire.noPreserveCache();

describe('client/lib/utilities/map-marker-modal-preview', () => {
    let stubs;
    let mapMarkerModalPreview;

    beforeEach(() => {
        stubs = {
            './../templates/map-marker-modal-preview.hbs': testHelpers.stub()
        };

        mapMarkerModalPreview = proxyquire.noCallThru().load(require.resolve('./map-marker-modal-preview'), stubs);
    });

    it('should be a function', () => {
        expect(mapMarkerModalPreview).to.be.a('function');
    });
});
