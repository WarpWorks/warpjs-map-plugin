const $ = require('jquery');
const jsdomGlobal = require('jsdom-global');
const testHelpers = require('@quoin/node-test-helpers');

const expect = testHelpers.expect;
const stub = testHelpers.stub;

const showMapMarkerListModal = require('./show-map-marker-list-modal');

function generateHTML() {
    return `
    <div class="div-with-data" data-row-index="1" data-coordinate-index="2"></div>
    <div class="some-modal-container">
        <div class="some-modal-body">
            Original Text
        </div>
    </div>`;
}

function modalTemplate(obj) {
    const text = obj.mapMarkers.length ? obj.mapMarkers[0].identifier : 'It was empty';
    return `<div class="some-modal-body">${text}</div>`;
}

describe('client/map/lib/utilities/show-map-marker-list-modal', () => {
    let event;
    let jsdomCleanup;
    let mapMarkerPreviewModal;
    let mapUtility;

    beforeEach(() => {
        $.fn.extend({
            modal: stub()
        });

        jsdomCleanup = jsdomGlobal('<body></body>');
        $('body').html(generateHTML());

        event = {
            currentTarget: '.div-with-data'
        };

        mapMarkerPreviewModal = {
            toggle: stub()
        };
    });

    afterEach(() => {
        jsdomCleanup();
        $.fn.modal = null;
    });

    it('should be a function', () => {
        expect(showMapMarkerListModal).to.be.a('function');
    });

    it('should show show map marker modal when the map matrix is empty', () => {
        mapUtility = {
            getSubColumns: () => {
                return [];
            },
            getSubRows: () => {
                return [{id: "dummy"}, {id: "dummy2"}];
            },
            getFormattedData: () => {
                return {
                    mapMatrix: {
                        subRows: []
                    }
                };
            }
        };

        showMapMarkerListModal($, modalTemplate, mapUtility, '.some-modal-container', '.some-modal-body', mapMarkerPreviewModal, event);

        expect($('.some-modal-body').text()).to.equal('It was empty');
        expect($.fn.modal).to.have.callCount(1);
    });

    it('should show map marker modal when the map matrix has data', () => {
        mapUtility = {
            getSubColumns: () => {
                return [];
            },
            getSubRows: () => {
                return [{id: "dummy"}, {id: "dummy2"}];
            },
            getFormattedData: () => {
                return {
                    mapMatrix: {
                        subRows: [
                            [
                                [
                                    {
                                        identifier: ""
                                    }
                                ]
                            ],
                            [
                                [
                                    {
                                        identifier: ""
                                    }
                                ],
                                [
                                    {
                                        identifier: ""
                                    }
                                ],
                                [
                                    {
                                        identifier: "This is correct"
                                    }
                                ]
                            ]
                        ]
                    }
                };
            }
        };

        showMapMarkerListModal($, modalTemplate, mapUtility, '.some-modal-container', '.some-modal-body', mapMarkerPreviewModal, event);

        expect($('.some-modal-body').text()).to.equal('This is correct');
        expect($.fn.modal).to.have.callCount(1);
    });
});
