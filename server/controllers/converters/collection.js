module.exports = (prop, memo, doc) => {
    memo[prop][doc.id] = doc;
    return memo;
};
