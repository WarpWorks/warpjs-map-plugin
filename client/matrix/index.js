const cache = require('./cache');
const generateContent = require('./generate-content');
const loadingTemplate = require('./../loading.hbs');
const primarySelection = require('./../primary-navigation/current-selection');
const secondarySelection = require('./../secondary-navigation/current-selection');
const template = require('./template.hbs');

let alreadyInitialized = false;

module.exports = {
    init(data) {
        cache.init(data.aggregations, data._embedded.mapMarkers);
    },

    update($) {
        if (alreadyInitialized) {
            $('#map-table').html(loadingTemplate());

            const col = primarySelection($);
            const row = secondarySelection($);
            const content = generateContent($, col, row);

            $('#map-table').html(template(content));
        } else {
            // This is to prevent double call on initialization.
            alreadyInitialized = true;
        }
    }
};
