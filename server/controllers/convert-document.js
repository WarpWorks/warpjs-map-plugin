module.exports = (converterMap, memo, doc) => {
    return converterMap[doc.type](memo, doc);
};
