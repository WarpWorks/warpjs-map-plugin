const $ = require('jquery');
const jsdomGlobal = require('jsdom-global');
const testHelpers = require('@quoin/node-test-helpers');

const addActiveClassToRowLists = require('./add-active-class-to-row-lists');

const expect = testHelpers.expect;

function generateHTML() {
    return `
        <div>
            <div class="list">
                <ol class="vertical-list">
                    <li class="item" data-id="id6">Name 6</li>
                    <li class="item" data-id="id7">Name 7</li>
                    <li class="item" data-id="id8">Name 8</li>
                    <li class="item" data-id="id9">Name 9</li>
                </ol>
            </div>
            <div class="list">
                <ol class="horizontal-list">
                    <li class="item" data-id="id6">Name 6</li>
                    <li class="item" data-id="id7">Name 7</li>
                    <li class="item" data-id="id8">Name 8</li>
                    <li class="item" data-id="id9">Name 9</li>
                </ol>
            </div>
        </div>`;
}

describe('client/map/lib/utilities/add-active-class-to-row-lists', () => {
    let jsdomCleanup;

    beforeEach(() => {
        jsdomCleanup = jsdomGlobal('<body></body>');
        $('body').html(generateHTML());
    });

    afterEach(() => {
        jsdomCleanup();
    });

    it('should be a function', () => {
        expect(addActiveClassToRowLists).to.be.a('function');
    });

    it('should add a class to the same elements in the 2 different lists', () => {
        expect($('.list .vertical-list .list-item:nth-child(2)').hasClass('new-class')).to.equal(false);
        expect($('.list .vertical-list .list-item:nth-child(3)').hasClass('new-class')).to.equal(false);

        expect($('.list .horizontal-list .list-item:nth-child(2)').hasClass('new-class')).to.equal(false);
        expect($('.list .horizontal-list .list-item:nth-child(3)').hasClass('new-class')).to.equal(false);

        addActiveClassToRowLists($, '.list', '.item', 2, 'new-class');

        expect($('.list .vertical-list .item:nth-child(2)').hasClass('new-class')).to.equal(false);
        expect($('.list .vertical-list .item:nth-child(3)').hasClass('new-class')).to.equal(true);

        expect($('.list .horizontal-list .item:nth-child(2)').hasClass('new-class')).to.equal(false);
        expect($('.list .horizontal-list .item:nth-child(3)').hasClass('new-class')).to.equal(true);
    });

    it('should throw an error when jquery not passed in', () => {
        expect(addActiveClassToRowLists.bind(null)).to.throw(TypeError);
    });
});
