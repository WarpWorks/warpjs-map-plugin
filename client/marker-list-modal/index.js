const Promise = require('bluebird');
const warpjsUtils = require('@warp-works/warpjs-utils');

const constants = require('./constants');
const contentTemplate = require('./content.hbs');
const markerItemMapper = require('./marker-item-mapper');
const template = require('./template.hbs');

let modal;

module.exports = {
    show($, element) {
        if (!modal) {
            modal = $(template());
        }

        const items = $(constants.ITEM, element).get().map((markerItem) => markerItemMapper($, markerItem));

        const data = {
            col: {
                href: $(element).data('warpjsColHref'),
                name: $(element).data('warpjsColName')
            },
            row: {
                href: $(element).data('warpjsRowHref'),
                name: $(element).data('warpjsRowName')
            },
            items
        };

        modal.html(contentTemplate(data));
        modal.modal('show');

        items.forEach((item) => {
            return Promise.resolve()
                .then(() => warpjsUtils.proxy.get($, item.previewUrl))
                .then((res) => {
                    item.content = res.content;
                })
                .catch(() => {
                    item.error = true;
                })
                .finally(() => modal.html(contentTemplate(data)))
            ;
        });
    },

    hide() {
        if (modal) {
            modal.modal('hide');
        }
    }
};
