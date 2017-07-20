const $ = require('jquery');
const jsdomGlobal = require('jsdom-global');
const testHelpers = require('@quoin/node-test-helpers');
const expect = testHelpers.expect;

function generateHTML() {
    return `
    <div class="container">
        <span class="prev style1 style2 style3 style4">previous</span>
        <ol>
            <li class="item style1">item1</li>
            <li class="item style1 style2">item2</li>
            <li class="item style1 style2 style3">item3</li>
            <li class="item style1 style2 style3 style4">item4</li>
        </ol>
        <span class="next style1 style2 style3 style4">next</span>
    </div>`;
}

describe('client/map/lib/utilities/pagination', () => {
    let jsdomCleanup;
    let pagination;
    let paginationSetting;

    beforeEach(() => {
        jsdomCleanup = jsdomGlobal('<body></body>');
        $('body').html(generateHTML());

        pagination = require('./pagination');
        paginationSetting = {
            style1: 1,
            style2: 2,
            style3: 3,
            style4: 4,
            style5: 5
        };
    });

    afterEach(() => {
        jsdomCleanup();
    });

    it('should throw an error because the jquery needs to be passed in to the methods', () => {
        expect(pagination.paginate.bind(null)).to.throw(Error);
        expect(pagination.hideOrDisplayArrow.bind(null, null, paginationSetting)).to.throw(Error);
        expect(pagination.generateInitialElementStyles.bind(null, null, paginationSetting, $('.container .item').get())).to.throw(Error);
    });

    describe('paginate', () => {
        it('should throw and error because a valid jquery object needs to be entered for the liList', () => {
            expect(pagination.paginate.bind(null, $)).to.throw(Error);
        });

        it('should shift styles to the right and wrap last style to first element', () => {
            pagination.paginate($, paginationSetting, $('.container .item'), 'next');

            expect($('.container .item:nth-child(1)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style4')).to.equal(true);

            expect($('.container .item:nth-child(2)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style2')).to.equal(false);
            expect($('.container .item:nth-child(2)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(2)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(3)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(3)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(4)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style4')).to.equal(false);
        });

        it('should not shift styles because the first elements class has be shifted to the last element', () => {
            pagination.paginate($, paginationSetting, $('.container .item'), 'next');
            pagination.paginate($, paginationSetting, $('.container .item'), 'next');
            pagination.paginate($, paginationSetting, $('.container .item'), 'next');

            expect($('.container .item:nth-child(1)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style4')).to.equal(true);

            expect($('.container .item:nth-child(2)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(3)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(3)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(4)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style2')).to.equal(false);
            expect($('.container .item:nth-child(4)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(4)').hasClass('style4')).to.equal(false);

            pagination.paginate($, paginationSetting, $('.container .item'), 'next');

            expect($('.container .item:nth-child(1)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style4')).to.equal(true);

            expect($('.container .item:nth-child(2)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(3)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(3)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(4)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style2')).to.equal(false);
            expect($('.container .item:nth-child(4)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(4)').hasClass('style4')).to.equal(false);
        });

        it('should not shift styles because the first elements class is already at the beginning', () => {
            pagination.paginate($, paginationSetting, $('.container .item'), 'previous');

            expect($('.container .item:nth-child(1)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style2')).to.equal(false);
            expect($('.container .item:nth-child(1)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(1)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(2)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(2)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(3)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(4)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style4')).to.equal(true);
        });

        it('should shift styles to the left and wrap first style to last element', () => {
            pagination.paginate($, paginationSetting, $('.container .item'), 'next');
            pagination.paginate($, paginationSetting, $('.container .item'), 'previous');

            expect($('.container .item:nth-child(1)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(1)').hasClass('style2')).to.equal(false);
            expect($('.container .item:nth-child(1)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(1)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(2)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(2)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(3)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(4)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style4')).to.equal(true);
        });
    });

    describe('hideOrDisplayArrow', () => {
        it('should set the styles for the previous span', () => {
            const list = $('.container .item').get();
            pagination.hideOrDisplayArrow($, paginationSetting, list[0], '.prev');

            expect($('.prev').hasClass('style1')).to.equal(false);
            expect($('.prev').hasClass('style2')).to.equal(true);
            expect($('.prev').hasClass('style3')).to.equal(true);
            expect($('.prev').hasClass('style4')).to.equal(true);
            expect($('.prev').hasClass('style5')).to.equal(true);
        });

        it('should set the styles for the next span', () => {
            const list = $('.container .item').get();
            pagination.hideOrDisplayArrow($, paginationSetting, list[0], '.next');

            expect($('.prev').hasClass('style1')).to.equal(true);
            expect($('.prev').hasClass('style2')).to.equal(true);
            expect($('.prev').hasClass('style3')).to.equal(true);
            expect($('.prev').hasClass('style4')).to.equal(true);
            expect($('.prev').hasClass('style5')).to.equal(false);
        });
    });

    describe('generateInitialElementStyles', () => {
        it('should add and remove styles based on pagination settings', () => {
            const defaultHtml = `
                <div class="container">
                    <span class="prev style1 style2 style3 style4">previous</span>
                    <ol>
                        <li class="item style1 style2 style3 style4">item1</li>
                        <li class="item style1 style2 style3 style4">item2</li>
                        <li class="item style1 style2 style3 style4">item3</li>
                        <li class="item style1 style2 style3 style4">item4</li>
                    </ol>
                    <span class="next style1 style2 style3 style4">next</span>
                </div>`;

            $('body').html(defaultHtml);

            pagination.generateInitialElementStyles($, paginationSetting, $('.container .item').get());

            expect($('.container .item:nth-child(1)').hasClass('style1')).to.equal(false);
            expect($('.container .item:nth-child(1)').hasClass('style2')).to.equal(false);
            expect($('.container .item:nth-child(1)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(1)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(2)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(2)').hasClass('style2')).to.equal(false);
            expect($('.container .item:nth-child(2)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(2)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(3)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(3)').hasClass('style3')).to.equal(false);
            expect($('.container .item:nth-child(3)').hasClass('style4')).to.equal(false);

            expect($('.container .item:nth-child(4)').hasClass('style1')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style2')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style3')).to.equal(true);
            expect($('.container .item:nth-child(4)').hasClass('style4')).to.equal(false);
        });
    });
});
