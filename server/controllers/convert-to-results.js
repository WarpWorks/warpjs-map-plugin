const convertDocument = require('./convert-document');

module.exports = (converterMap, memo, documents) => {
    return documents.reduce((memo, doc) => convertDocument(converterMap, memo, doc), memo);
};
