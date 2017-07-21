const $ = require('jquery');
const jsdomGlobal = require('jsdom-global');
const testHelpers = require('@quoin/node-test-helpers');

const constants = require('./constants');

const expect = testHelpers.expect;
const stub = testHelpers.stub;
const proxyquire = testHelpers.proxyquire.noPreserveCache();

function generateHTML() {
    return `
    <div>
        <div class="map-header">
            <div class="column-list">
                <span class="pagination-previous"></span>
                <ol class="horizontal-list">
                    <li class="list-item" data-id="id1" data-url="/dummy/path/img1.jpg">item 1</li>
                    <li class="list-item" data-id="id2" data-url="/dummy/path/img2.jpg">item 2</li>
                    <li class="list-item" data-id="id3" data-url="/dummy/path/img3.jpg">item 3</li>
                </ol>
                <span class="pagination-next"></span>
            </div>
            <div class="label-text"></div>
        </div>
        <div class="map-body">
            <div class="map-marker"></div>
            <div class="row-list">
                <span class="pagination-previous"></span>
                <ol class="horizontal-list">
                    <li class="list-item" data-id="id4">item 4</li>
                    <li class="list-item" data-id="id5">item 5</li>
                    <li class="list-item" data-id="id6">item 6</li>
                    <li class="list-item" data-id="id7">item 7</li>
                </ol>
                <span class="pagination-next"></span>
            </div>
        </div>
    </div>`;
}

describe('client/map/lib/utilities/initialize', () => {
    let jsdomCleanup;
    let stubs;
    let mapUtility;
    let paginationSettings;
    let clickPosition;
    let columnListFirstChild;
    let initialize;
    let clickEventsHeader;
    let clickEventsBody;

    let addActiveClassToRowListsPath;
    let changeBackgroundImagePath;
    let initializePaginationStylesPath;
    let paginatePath;
    let showMapMarkerListModalPath;
    let updateInnerGridPath;
    let mapMarkerListModalTemplatePath;
    let mapTableTemplatePath;

    beforeEach(() => {
        jsdomCleanup = jsdomGlobal('<body></body>');
        $('body').html(generateHTML());

        addActiveClassToRowListsPath = stub();
        changeBackgroundImagePath = stub();
        initializePaginationStylesPath = stub();
        paginatePath = stub();
        showMapMarkerListModalPath = stub();
        updateInnerGridPath = stub();
        mapMarkerListModalTemplatePath = stub();
        mapTableTemplatePath = stub();

        stubs = {};
        stubs['./add-active-class-to-row-lists'] = addActiveClassToRowListsPath;
        stubs['./change-background-image'] = changeBackgroundImagePath;
        stubs['./initialize-pagination-styles'] = initializePaginationStylesPath;
        stubs['./paginate'] = paginatePath;
        stubs['./show-map-marker-list-modal'] = showMapMarkerListModalPath;
        stubs['./update-inner-grid'] = updateInnerGridPath;
        stubs['./../templates/map-marker-list-modal.hbs'] = mapMarkerListModalTemplatePath;
        stubs['./../templates/_mapTable.hbs'] = mapTableTemplatePath;

        initialize = proxyquire.noCallThru().load(require.resolve('./initialize'), stubs);

        mapUtility = {};
        paginationSettings = {};
        clickPosition = {
            setClickPosition: stub()
        };
        columnListFirstChild = $('.column-list .list-item:first-child').get();
    });

    afterEach(() => {
        jsdomCleanup();
    });

    it('should be a function', () => {
        expect(initialize).to.be.a('function');
    });

    it('should add active style to the first element', () => {
        expect($(columnListFirstChild).hasClass(constants.ACTIVE_BUTTON_CLASS_NAME)).to.equal(false);

        initialize($, mapUtility, paginationSettings, clickPosition, columnListFirstChild);

        expect($(columnListFirstChild).hasClass(constants.ACTIVE_BUTTON_CLASS_NAME)).to.equal(true);
    });

    it('should add the text to the label-text element', () => {
        expect($('.label-text').text()).to.equal('');

        initialize($, mapUtility, paginationSettings, clickPosition, columnListFirstChild);

        expect($('.label-text').text()).to.equal('item 1');
    });

    it('should call stubed methods', () => {
        initialize($, mapUtility, paginationSettings, clickPosition, columnListFirstChild);

        expect(clickPosition.setClickPosition).to.have.callCount(1);
        expect(addActiveClassToRowListsPath).to.have.callCount(1);
        expect(changeBackgroundImagePath).to.have.callCount(1);
        expect(initializePaginationStylesPath).to.have.callCount(2);
    });

    it('should add click events to the map-header and map-body', () => {
        initialize($, mapUtility, paginationSettings, clickPosition, columnListFirstChild);

        clickEventsHeader = $._data($('.map-header').get(0)).events.click;
        clickEventsBody = $._data($('.map-body').get(0)).events.click;

        expect(clickEventsHeader).to.have.lengthOf(3);
        expect(clickEventsBody).to.have.lengthOf(4);

        expect(clickEventsHeader[0].selector).to.equal(constants.COLUMN_LIST_ITEM);
        expect(clickEventsHeader[1].selector).to.equal(constants.COLUMN_LIST_PREVIOUS_ARROW);
        expect(clickEventsHeader[2].selector).to.equal(constants.COLUMN_LIST_NEXT_ARROW);

        expect(clickEventsBody[0].selector).to.equal(constants.ROW_LIST_ITEM);
        expect(clickEventsBody[1].selector).to.equal(constants.ROW_LIST_PREVIOUS_ARROW);
        expect(clickEventsBody[2].selector).to.equal(constants.ROW_LIST_NEXT_ARROW);
        expect(clickEventsBody[3].selector).to.equal(constants.MAP_MARKER);
    });

    it('should call update-inner-grid on all column list items click events', () => {
        initialize($, mapUtility, paginationSettings, clickPosition, columnListFirstChild);

        $(constants.COLUMN_LIST_ITEM).click();

        expect(updateInnerGridPath).to.have.callCount(3);
    });

    it('should call update-inner-grid on all row list items click events', () => {
        initialize($, mapUtility, paginationSettings, clickPosition, columnListFirstChild);

        $(constants.ROW_LIST_ITEM).click();

        expect(updateInnerGridPath).to.have.callCount(4);
    });

    it('should call paginate on column-list paginate-left and paginate-right click events', () => {
        initialize($, mapUtility, paginationSettings, clickPosition, columnListFirstChild);

        $(constants.COLUMN_LIST_PREVIOUS_ARROW).click();
        $(constants.COLUMN_LIST_NEXT_ARROW).click();

        expect(paginatePath).to.have.callCount(2);
    });

    it('should call paginate on row-list paginate-left and paginate-right click events', () => {
        initialize($, mapUtility, paginationSettings, clickPosition, columnListFirstChild);

        $(constants.ROW_LIST_PREVIOUS_ARROW).click();
        $(constants.ROW_LIST_NEXT_ARROW).click();

        expect(paginatePath).to.have.callCount(2);
    });

    it('should call show-map-marker-list-modal map marker click event', () => {
        initialize($, mapUtility, paginationSettings, clickPosition, columnListFirstChild);

        $(constants.MAP_MARKER).click();

        expect(showMapMarkerListModalPath).to.have.callCount(1);
    });

    it('should throw an error because jquery was not defined', () => {
        expect(initialize.bind(null)).to.throw(Error);
    });

    it('should throw an error because click position was not defined', () => {
        expect(initialize.bind(null, $)).to.throw(Error);
    });
});
