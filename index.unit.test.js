const testHelpers = require('@quoin/node-test-helpers');

const moduleToTest = require('./index');

const expect = testHelpers.expect;

describe("index", () => {
    it("should expose a function with 3 params", () => {
        expect(moduleToTest).to.be.a('function').to.have.lengthOf(3);
    });

    it("should return a function with 2 params", () => {
        const value = moduleToTest();

        expect(value).to.be.a('function').to.have.lengthOf(2);
    });
});
