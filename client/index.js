const Promise = require('bluebird');
const warpjsUtils = require('@warp-works/warpjs-utils');

const errorTemplate = require('./error.hbs');
const matrix = require('./matrix');
const primaryNavigation = require('./primary-navigation');
const secondaryNavigation = require('./secondary-navigation');
const template = require('./template.hbs');

(($) => $(document).ready(() => {
    const loader = warpjsUtils.toast.loading($, "Page is loading");
    const placeholder = $('#warpjs-content-placeholder');

    return warpjsUtils.getCurrentPageHAL($)
        .then((result) => {
            warpjsUtils.toast.close($, loader);
            if (result.error) {
                placeholder.html(errorTemplate(result.data));
            } else {
                return Promise.resolve()
                    .then(() => placeholder.html(template(result.data)))
                    .then(() => matrix.init(result.data))
                    .then(() => primaryNavigation($, result.data.columns))
                    .then(() => secondaryNavigation($, result.data.rows))
                    .then(() => matrix.addListeners($))
                    .then(() => warpjsUtils.documentReady($))
                ;
            }
        })
        .catch((err) => {
            warpjsUtils.toast.close($, loader);
            placeholder.html(errorTemplate({
                message: err.message,
                details: err.stack
            }));
        })
    ;
}))(jQuery);
