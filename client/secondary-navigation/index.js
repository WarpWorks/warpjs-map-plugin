const Promise = require('bluebird');
const warpjsUtils = require('@warp-works/warpjs-utils');

const constants = require('./constants');
const generateDom = require('./generate-dom');
const itemClicked = require('./item-clicked');
const loadingTemplate = require('./../loading.hbs');
const mapBodyTemplate = require('./../map-body.hbs');
const matrix = require('./../matrix');

module.exports = ($, elements) => {
    generateDom($, elements);

    // When a row is selected.
    $(constants.CONTAINER).on('click', constants.LIST_ITEM, function(e) {
        e.preventDefault();
        e.stopPropagation();
        itemClicked($, this);
    });

    // When a type is selected.
    $(constants.CONTAINER).on('click', constants.TYPE_ITEMS, function(e) {
        e.preventDefault(); // Don't want location href to change.

        return Promise.resolve()
            .then(() => $(constants.MATRIX_CONTAINER).html(loadingTemplate()))
            .then(() => warpjsUtils.proxy.get($, $(this).data('url')))
            .then((result) => {
                matrix.init(result);
                $(constants.CONTAINER).html(mapBodyTemplate(result));
                generateDom($, result.rows);
                $(constants.FIRST_CHILD, constants.CONTAINER).click();
            })
            .catch((err) => {
                console.log("TODO: give UI error feedback:", err);
            })
        ;
    });

    $(constants.FIRST_CHILD, constants.CONTAINER).click();
};
