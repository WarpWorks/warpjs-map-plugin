const _ = require('lodash');

const PROPS_TO_PICK = require('./props-to-pick');

module.exports = (doc) => {
    const data = _.pick(doc, PROPS_TO_PICK);
    if (data.Position && (typeof data.Position === 'string')) {
        data.Position = Number.parseInt(data.Position);
    }
    return data;
};
