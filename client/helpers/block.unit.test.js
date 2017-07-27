const testHelpers = require('@quoin/node-test-helpers');

const moduleToTest = require('./block');

const expect = testHelpers.expect;

describe("client/helpers/block", () => {
    it("should expose a function with 2 params", () => {
        expect(moduleToTest).to.be.a('function').to.have.lengthOf(2);
    });
});
