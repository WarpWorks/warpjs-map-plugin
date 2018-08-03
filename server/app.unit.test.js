const RoutesInfoCache = require('@quoin/expressjs-routes-info/lib/cache');
const RoutesInfo = require('@quoin/expressjs-routes-info');
const testHelpers = require('@quoin/node-test-helpers');
const warpjsUtils = require('@warp-works/warpjs-utils');

const proxyquire = testHelpers.proxyquire.noCallThru().noPreserveCache();

const moduleToTest = proxyquire(require.resolve('./app'), {
    'hbs-utils': () => ({
        registerWatchedPartials: () => {}
    })
});

const expect = testHelpers.expect;

describe("server/app", () => {
    beforeEach(() => {
        RoutesInfoCache.reset();

        const routesInfo = new RoutesInfo('/sub-path', '/base-url');
        routesInfo.route('entity', '/entity-path/type/{type}/id/{id}');

        warpjsUtils.cache.setConfig({
            headerItems: [{
                label: "Foo Bar",
                type: "FooBar",
                id: "123123123123"
            }]
        });
    });

    it("should expose a function with 5 params", () => {
        expect(moduleToTest).to.be.a('function').to.have.lengthOf(5);
    });

    it("should return an express app", () => {
        const config = {};
        const warpCore = {};
        const Persistence = {};
        const baseUrl = '/';
        const staticUrl = '';

        const value = moduleToTest(config, warpCore, Persistence, baseUrl, staticUrl);
        expect(value).not.to.be.undefined();
    });
});
