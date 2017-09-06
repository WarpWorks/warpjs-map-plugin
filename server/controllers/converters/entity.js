module.exports = (prop, memo, doc) => {
    memo[prop].push(doc);
    return memo;
};
