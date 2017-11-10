const _ = require('lodash');
const testHelpers = require('@quoin/node-test-helpers');
const warpjsUtils = require('@warp-works/warpjs-utils');

const controllers = require('./index');

const expect = testHelpers.expect;

function appGet(key) {
    return key;
}

describe("server/map/controllers", () => {
    let persistence;

    beforeEach(() => {
        persistence = {};
    });

    it("should export an object", () => {
        expect(controllers).to.be.an('object');
    });

    it("should expose known properties", () => {
        const clone = _.clone(controllers);

        expect(clone).to.have.property('initialMap');
        delete clone.initialMap;

        expect(clone).to.deep.equal({});
    });

    describe("initialMap()", () => {
        it("should return 406 for unknown accept", (done) => {
            const reqOptions = {
                headers: {
                    Accept: 'unknown'
                }
            };
            const {req, res} = testHelpers.createMocks(reqOptions);

            controllers.initialMap(null, null, persistence, req, res);

            setTimeout(() => {
                expect(res._getStatusCode()).to.equal(406);
                done();
            }, 50);
        });

        it("should render index for html", (done) => {
            const reqOptions = {
                headers: {
                    Accept: 'text/html'
                }
            };
            const {req, res} = testHelpers.createMocks(reqOptions);
            req.app = { get: appGet };
            res.app = { get: appGet };

            controllers.initialMap(null, null, persistence, req, res);

            setTimeout(() => {
                expect(res._getStatusCode()).to.equal(200);
                expect(res._getRenderView()).to.equal('index');
                expect(res._getRenderData()).to.deep.equal({
                    title: 'Map',
                    bundles: [
                        'base-url/assets/vendor.min.js',
                        'base-url/assets/map.min.js'
                    ],
                    cssFile: 'base-url/assets/style.min.css',
                    baseUrl: 'base-url',
                    staticUrl: 'static-url'
                });
                done();
            }, 50);
        });

        it.skip("should return JSON for HAL", (done) => {
            const config = {
                mapTypes: [ 'a' ]
            };

            const reqOptions = {
                url: '/some/original/url',
                headers: {
                    Accept: warpjsUtils.constants.HAL_CONTENT_TYPE
                }
            };
            const {req, res} = testHelpers.createMocks(reqOptions);

            controllers.initialMap(config, null, persistence, req, res);

            setTimeout(() => {
                expect(res._getStatusCode()).to.equal(200);
                expect(res._headers).to.deep.equal({
                    'Content-Type': 'application/hal+json'
                });
                done();
            }, 100);
        });
    });
});