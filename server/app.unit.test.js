const testHelpers = require('@quoin/node-test-helpers');

const moduleToTest = require('./app');

const expect = testHelpers.expect;

describe("server/app", () => {
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
