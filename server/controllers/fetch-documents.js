const _ = require('lodash');
const Promise = require('bluebird');
const RoutesInfo = require('@quoin/expressjs-routes-info');

const PARENT_RELN_NAMES = require('./parent-reln-names');

module.exports = (persistence, entityArray, type, result) => {
    return Promise.reduce(entityArray, (result, entity) => {
        return Promise.resolve()
            .then(() => entity.getDocuments(persistence))
            .then((documents) => {
                documents.forEach((doc) => {
                    _.extend(doc, {
                        name: doc.Name,
                        description: doc.Description,
                        type,
                        W2Type: doc.type,
                        href: RoutesInfo.expand('entity', doc)
                    });
                    delete doc.Name;
                    delete doc.Description;
                    PARENT_RELN_NAMES[doc.parentRelnName] = doc.type;
                    result.push(doc);
                });
                return result;
            });
    }, result);
};
