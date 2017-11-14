const _ = require('lodash');

module.exports = (data) => _.extend({}, data, {
    isHeader: true
});
