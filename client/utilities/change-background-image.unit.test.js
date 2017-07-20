const $ = require('jquery');
const jsdomGlobal = require('jsdom-global');
const testHelpers = require('@quoin/node-test-helpers');

const changeBackgroundImage = require('./change-background-image');

const expect = testHelpers.expect;

function generateHTML(imageUrl) {
    return `<div id="mydiv" style="background-image: ${imageUrl};"></div>`;
}

describe('client/map/lib/utilities/change-background-image', () => {
    let jsdomCleanup;
    let originalImageUrl;

    beforeEach(() => {
        originalImageUrl = 'url(/original/path/to/image)';
        jsdomCleanup = jsdomGlobal('<body></body>');
        $('body').html(generateHTML(originalImageUrl));
    });

    afterEach(() => {
        jsdomCleanup();
    });

    it('should be a function', () => {
        expect(changeBackgroundImage).to.be.a('function');
    });

    it('should change the style for the given element', () => {
        const newImagePath = '/path/to/new/image';
        const newCssStyleProperty = `url(${newImagePath})`;

        expect($('#mydiv').css('background-image')).to.equal(originalImageUrl);

        changeBackgroundImage($, '#mydiv', newImagePath);

        expect($('#mydiv').css('background-image')).to.equal(newCssStyleProperty);
    });

    it('should throw an error when jquery not passed in', () => {
        expect(changeBackgroundImage.bind(null)).to.throw(TypeError);
    });
});
