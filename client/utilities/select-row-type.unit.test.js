const $ = require('jquery');
const Promise = require('bluebird');
const jsdomGlobal = require('jsdom-global');
const testHelpers = require('@quoin/node-test-helpers');

const expect = testHelpers.expect;
const spy = testHelpers.spy;
const stub = testHelpers.stub;
const proxyquire = testHelpers.proxyquire.noPreserveCache();

const mockResponses = require('./current-hal-mock-response');

function generateHTML() {
    return `
    <div>
        <div id="warpjs-content-placeholder"></div>
        <div class="map-header">
            <div class="column-list">
                <span class="pagination-previous"></span>
                <ol class="horizontal-list">
                    <li class="list-item" data-id="id1" data-url="/dummy/path/img1.jpg">item 1</li>
                    <li class="list-item" data-id="id2" data-url="/dummy/path/img2.jpg">item 2</li>
                    <li class="list-item active-outer-button" data-id="id3" data-url="/dummy/path/img3.jpg">item 3</li>
                </ol>
                <span class="pagination-next"></span>
            </div>
            <div class="label-text"></div>
        </div>
        <div class="map-body">
            <div class="selectable-link-item"></div>
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

function success() {
    return '<div class="success">Successfull Replacement</div>';
}

function error() {
    return '<div class="err">Error</div>';
}

describe('client/map/lib/utilities/select-row-type', () => {
    let stubs;
    let selectRowType;

    let initializePath;
    let jsdomCleanup;
    let mapUtilsPath;
    let paginatePath;
    let utilsPath;
    let indexTemplatePath;
    let errorTemplatePath;

    beforeEach(() => {
        jsdomCleanup = jsdomGlobal('<body></body>');
        $('body').html(generateHTML());

        initializePath = stub();
        mapUtilsPath = class MapUtils {
            constructor() {
                return null;
            }
            updateProperties() {
                return null;
            }
            getFormattedData() {
                return null;
            }
        };
        paginatePath = stub();
        utilsPath = stub();
        indexTemplatePath = () => success();
        errorTemplatePath = () => error();

        stubs = {};
        stubs['./initialize'] = initializePath;
        stubs['./map-utils'] = mapUtilsPath;
        stubs['./paginate'] = paginatePath;
        stubs['./../templates/index.hbs'] = indexTemplatePath;
        stubs['./../templates/_error.hbs'] = errorTemplatePath;
    });

    afterEach(() => {
        jsdomCleanup();
    });

    it('should be a function', () => {
        selectRowType = proxyquire.noCallThru().load(require.resolve('./select-row-type'), stubs);

        expect(selectRowType).to.be.a('function');
    });

    it('should set the error', (done) => {
        const mapMarkerModalPreview = {};
        const columnEvent = {};
        const mapUtility = {};
        const paginationSetting = {};
        const clickPosition = {};

        stubs['./../../../utils'] = {
            getCurrentPageHAL: () => {
                return Promise.resolve(mockResponses.failedMockResponse());
            }
        };

        selectRowType = proxyquire.noCallThru().load(require.resolve('./select-row-type'), stubs);

        selectRowType($, mapUtility, paginationSetting, clickPosition, mapMarkerModalPreview, columnEvent);

        setTimeout(() => {
            expect($('#warpjs-content-placeholder').html()).to.equal(error());
            done();
        }, 300);
    });

    it('should re-initialize the page', (done) => {
        const mapMarkerModalPreview = {};
        const columnEvent = {};
        const mapUtility = {
            getActiveColumn: stub()
        };
        const paginationSetting = {};
        const clickPosition = {
            getClickPosition: () => {
                return 2;
            }
        };

        stubs['@warp-works/warpjs-utils'] = {
            getCurrentPageHAL: () => {
                return Promise.resolve(mockResponses.succesfulMockResponse());
            }
        };

        selectRowType = proxyquire.noCallThru().load(require.resolve('./select-row-type'), stubs);

        spy(clickPosition, 'getClickPosition');
        spy(mapUtilsPath.prototype, 'updateProperties');
        spy(mapUtilsPath.prototype, 'getFormattedData');

        selectRowType($, mapUtility, paginationSetting, clickPosition, mapMarkerModalPreview, columnEvent);

        setTimeout(() => {
            expect(clickPosition.getClickPosition).to.have.callCount(1);
            expect(mapUtility.getActiveColumn).to.have.callCount(1);
            expect(mapUtilsPath.prototype.updateProperties).to.have.callCount(1);
            expect(mapUtilsPath.prototype.getFormattedData).to.have.callCount(1);
            expect($('#warpjs-content-placeholder').html()).to.equal(success());
            expect(initializePath).to.have.callCount(1);
            expect($._data($('.map-body').get(0)).events.click.length).to.equal(1);
            expect(paginatePath).to.have.callCount(2);
            done();
        }, 300);
    });
});
