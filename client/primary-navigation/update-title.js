const constants = require('./constants');

module.exports = ($, element) => {
    $(constants.TITLE).text($(element).data('warpjsName'));
};
