const lodashClone = require('lodash/clone');
const testHelpers = require('@quoin/node-test-helpers');

const moduleToTest = require('./constants');

const expect = testHelpers.expect;

describe("server/constants", () => {
    it("should expose an object", () => {
        expect(moduleToTest).to.be.an('object');
    });

    context("properties", () => {
        let clone;

        before(() => {
            clone = lodashClone(moduleToTest);
        });

        context(".basename", () => {
            it("should be exposed", () => {
                expect(clone).to.have.property('basename');
            });

            it("should be a string", () => {
                expect(clone.basename).to.be.a('string');
            });

            after(() => {
                delete clone.basename;
            });
        });

        context(".version", () => {
            it("should be exposed", () => {
                expect(clone).to.have.property('version');
            });

            it("should be a string", () => {
                expect(clone.version).to.be.a('string');
            });

            after(() => {
                delete clone.version;
            });
        });

        context(".versionedName", () => {
            it("should be exposed", () => {
                expect(clone).to.have.property('versionedName');
            });

            it("should be a string", () => {
                expect(clone.versionedName).to.be.a('string');
            });

            after(() => {
                delete clone.versionedName;
            });
        });

        context(".assets", () => {
            let assetsClone;

            before(() => {
                assetsClone = lodashClone(clone.assets);
            });

            it("should be exposed", () => {
                expect(clone).to.have.property('assets');
            });

            it("should be an object", () => {
                expect(clone.assets).to.be.an('object');
            });

            context(".js", () => {
                it("should be exposed", () => {
                    expect(clone.assets).to.have.property('js');
                });

                it("should be a string", () => {
                    expect(clone.assets.js).to.be.a('string');
                });

                after(() => {
                    delete assetsClone.js;
                });
            });

            context(".css", () => {
                it("should be exposed", () => {
                    expect(clone.assets).to.have.property('css');
                });

                it("should be a string", () => {
                    expect(clone.assets.css).to.be.a('string');
                });

                after(() => {
                    delete assetsClone.css;
                });
            });

            after(() => {
                expect(assetsClone).to.be.empty();
                delete clone.assets;
            });
        });

        after(() => {
            expect(clone).to.be.empty();
        });
    });
});
