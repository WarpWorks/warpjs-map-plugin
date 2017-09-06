const _ = require('lodash');

const replaceParentRelnName = require('./replace-parent-reln-name');

module.exports = (domain, memo, doc, id) => {
    const entity = domain.getEntityByName(doc.W2Type);
    const assocs = entity.getAssociations();

    return _.extend(memo, {
        [id]: replaceParentRelnName(assocs, doc)
    });
};
