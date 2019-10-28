const constants = require('./constants');

module.exports = ($, element) => {
    const imageUrl = $(element).data('bgImgUrl');

    const backgrounds = [ 'none' ];
    if (imageUrl) {
        backgrounds.push(`url(${imageUrl})`);
    }

    backgrounds.forEach((background) => $(constants.MAP_HEADER).css({ 'background-image': background }));
};
