const jsdomGlobal = require('jsdom-global');
const testHelpers = require('@quoin/node-test-helpers');

const expect = testHelpers.expect;
const proxyquire = testHelpers.proxyquire.noPreserveCache().noCallThru();

describe("client/index", () => {
    let jsdomCleanup;
    let moduleToTest;

    beforeEach(() => {
        jsdomCleanup = jsdomGlobal('<html></html>');

        const stubs = {
        };
        moduleToTest = proxyquire.load(require.resolve('./index'), stubs);
    });
});
