const $ = require('jquery');
const jsdomGlobal = require('jsdom-global');
const testHelpers = require('@quoin/node-test-helpers');

const constants = require('./../constants');

const expect = testHelpers.expect;
const stub = testHelpers.stub;
const proxyquire = testHelpers.proxyquire.noPreserveCache();

function generateHTML() {
    return `
        <div>
            <div id="map-table"></div>
            <div class="column-list">
                <span class="pagination-previous"></span>
                <ol class="outer-container horizontal-list">
                    <li class="list-item active-outer-button" data-id="id1" data-url="/dummy/path/img1">Name 1</li>
                    <li class="list-item" data-id="id2" data-url="/dummy/path/img2">Name 2</li>
                    <li class="list-item" data-id="id3" data-url="/dummy/path/img3">Name 3</li>
                    <li class="list-item" data-id="id4" data-url="/dummy/path/img4">Name 4</li>
                    <li class="list-item" data-id="id5" data-url="/dummy/path/img5">Name 5</li>
                </ol>
                <span class="pagination-next"></span>
            </div>
            <div class="row-list">
                <ol class="outer-container vertical-list">
                    <li class="list-item active-outer-button" data-id="id6">Name 6</li>
                    <li class="list-item" data-id="id7">Name 7</li>
                    <li class="list-item" data-id="id8">Name 8</li>
                    <li class="list-item" data-id="id9">Name 9</li>
                </ol>
            </div>
            <div class="row-list">
                <span class="pagination-previous"></span>
                <ol class="outer-container horizontal-list">
                    <li class="list-item active-outer-button" data-id="id6">Name 6</li>
                    <li class="list-item" data-id="id7">Name 7</li>
                    <li class="list-item" data-id="id8">Name 8</li>
                    <li class="list-item" data-id="id9">Name 9</li>
                </ol>
                <span class="pagination-next"></span>
            </div>
            <div class="label-text">Name 1</div>
        </div>`;
}

describe('client/map/lib/utilities/update-inner-grid', () => {
    let jsdomCleanup;
    let stubs;
    let updateInnerGrid;
    let mapUtility;
    let mapTableTemplate;

    let addActiveClassToRowListsPath;
    let changeBackgroundImagePath;

    beforeEach(() => {
        jsdomCleanup = jsdomGlobal('<html><body></body></html>');
        $('body').html(generateHTML());

        addActiveClassToRowListsPath = stub();
        changeBackgroundImagePath = stub();

        stubs = {
            './add-active-class-to-row-lists': addActiveClassToRowListsPath,
            './../horizontal-menu/change-background-image': changeBackgroundImagePath
        };

        updateInnerGrid = proxyquire.noCallThru().load(require.resolve('./update-inner-grid'), stubs);

        mapUtility = {
            updateProperties: stub(),
            getFormattedData: stub()
        };
        mapTableTemplate = stub();
    });

    afterEach(() => {
        jsdomCleanup();
    });

    it('should be a function', () => {
        expect(updateInnerGrid).to.be.a('function');
    });

    it('should throw an error because jquery was not passed into the method', () => {
        expect(updateInnerGrid.bind(null)).to.throw(Error);
    });

    it('should throw an error because the event was not defined', () => {
        expect(updateInnerGrid.bind(null, $)).to.throw(Error);
    });

    it('should throw an error because the mapUtility class does not have the updateProperties method', () => {
        const newSelectedColumnItem = '.column-list .list-item:nth-child(3)';
        const columnEvent = {
            currentTarget: newSelectedColumnItem
        };
        expect(updateInnerGrid.bind(null, $, null, null, null, columnEvent)).to.throw(Error);
    });

    it('should throw an error because the mapTableTemplate is not a method', () => {
        const newSelectedColumnItem = '.column-list .list-item:nth-child(3)';
        const columnEvent = {
            currentTarget: newSelectedColumnItem
        };
        expect(updateInnerGrid.bind(null, $, mapUtility, null, null, columnEvent)).to.throw(Error);
    });

    it('should get into the columns section', () => {
        const originalActiveColumnItem = '.column-list .list-item:nth-child(1)';
        const newSelectedColumnItem = '.column-list .list-item:nth-child(3)';
        const columnEvent = {
            currentTarget: newSelectedColumnItem
        };

        expect($(originalActiveColumnItem).hasClass(constants.ACTIVE_BUTTON_CLASS_NAME)).to.equal(true);
        expect($(newSelectedColumnItem).hasClass(constants.ACTIVE_BUTTON_CLASS_NAME)).to.equal(false);
        expect($(constants.MAP_IMAGE_LABEL_TEXT).text()).to.equal('Name 1');

        updateInnerGrid($, mapUtility, 'columns', mapTableTemplate, columnEvent);

        expect($(originalActiveColumnItem).hasClass(constants.ACTIVE_BUTTON_CLASS_NAME)).to.equal(false);
        expect($(newSelectedColumnItem).hasClass(constants.ACTIVE_BUTTON_CLASS_NAME)).to.equal(true);
        expect($(constants.MAP_IMAGE_LABEL_TEXT).text()).to.equal('Name 3');
    });

    it('should get into the row section and remove the active classes', () => {
        const firstHorizontalRowItem = '.horizontal-list .list-item:nth-child(1)';
        const firstVerticalRowItem = '.vertical-list .list-item:nth-child(1)';
        const thirdVerticalRowItem = '.row-list .vertical-list .list-item:nth-child(3)';
        const rowEvent = {
            currentTarget: thirdVerticalRowItem
        };

        expect($(constants.ROW_CONTAINER).find(firstHorizontalRowItem).hasClass(constants.ACTIVE_BUTTON_CLASS_NAME)).to.equal(true);
        expect($(constants.ROW_CONTAINER).find(firstVerticalRowItem).hasClass(constants.ACTIVE_BUTTON_CLASS_NAME)).to.equal(true);

        updateInnerGrid($, mapUtility, 'rows', mapTableTemplate, rowEvent);

        expect($(constants.ROW_CONTAINER).find(firstHorizontalRowItem).hasClass(constants.ACTIVE_BUTTON_CLASS_NAME)).to.equal(false);
        expect($(constants.ROW_CONTAINER).find(firstVerticalRowItem).hasClass(constants.ACTIVE_BUTTON_CLASS_NAME)).to.equal(false);
    });

    it('should call changeBackgroundImage method', () => {
        const newSelectedColumnItem = '.column-list .list-item:nth-child(3)';
        const columnEvent = {
            currentTarget: newSelectedColumnItem
        };

        updateInnerGrid($, mapUtility, 'columns', mapTableTemplate, columnEvent);

        expect(addActiveClassToRowListsPath).to.have.callCount(0);
        expect(changeBackgroundImagePath).to.have.callCount(1);
    });

    it('should call addActiveClassToRowLists method', () => {
        const thirdVerticalRowItem = '.row-list .vertical-list .list-item:nth-child(3)';
        const rowEvent = {
            currentTarget: thirdVerticalRowItem
        };

        updateInnerGrid($, mapUtility, 'rows', mapTableTemplate, rowEvent);

        expect(addActiveClassToRowListsPath).to.have.callCount(1);
        expect(changeBackgroundImagePath).to.have.callCount(0);
    });
});
