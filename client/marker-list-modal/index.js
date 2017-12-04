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
            items,
            loadingItems: {
                index: 1,
                total: items.length
            }
        };

        modal.html(contentTemplate(data));
        modal.modal('show');

        Promise.each(items, (item, index, total) => {
            return Promise.resolve()
                .then(() => warpjsUtils.proxy.get($, item.previewUrl))
                .then((res) => {
                    item.content = res.content;
                })
                .catch(() => {
                    item.error = true;
                })
                .finally(() => {
                    const loadingItems = {
                        index: index + 2,
                        total
                    };
                    if ((index + 1) === total) {
                        delete data.loadingItems;
                    } else {
                        data.loadingItems = loadingItems;
                    }
                    modal.html(contentTemplate(data));
                })
            ;
        });
    },

    hide() {
        if (modal) {
            modal.modal('hide');
        }
    }
};
