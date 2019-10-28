const RoutesInfo = require('@quoin/expressjs-routes-info');

module.exports = (config, results) => {
    const selectLinks = config.mapTypes
        .filter((type) => type !== config.columnParam && type !== config.rowParam)
        .map((type) => {
            return {
                name: type,
                href: RoutesInfo.expand('W2:plugin:map:column-row', { column: config.columnParam, row: type })
            };
        });

    results.selectableLinks = {};
    results.selectableLinks.activeSelectedType = config.rowParam;
    results.selectableLinks.selectable = selectLinks;

    return results;
};
