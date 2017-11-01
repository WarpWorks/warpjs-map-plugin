const _ = require('lodash');
const warpjsUtils = require('@warp-works/warpjs-utils');

const previewTemplate = require('./../preview-modal/template.hbs');

class MapMarkerModalPreview {
    constructor() {
        this._resultDataCache = [];
    }

    updatePartial($, action, modalItemPreviewContainer, templateObject) {
        modalItemPreviewContainer.html(previewTemplate(templateObject));
        action === "show" ? modalItemPreviewContainer.show() : modalItemPreviewContainer.hide();
    }

    showPreview($, modalItemPreviewContainer, content) {
        const overViewData = {
            content
        };

        this.updatePartial($, "show", modalItemPreviewContainer, overViewData);
    }

    hidePreview($, modalItemPreviewContainer) {
        this.updatePartial($, "hide", modalItemPreviewContainer, {});
    }

    extractDataAndShowPreview($, modalItemPreviewContainer, resultData) {
        let overViewData = _.filter(resultData._embedded.panels, (panel) => panel.type === "Overview");

        if (overViewData[0]._embedded.overviews.length) {
            const overview = overViewData[0]._embedded.overviews[0];

            this.showPreview($, modalItemPreviewContainer, overview.Content || "No content to display.");
        }
    }

    getResults($, modalItemPreviewContainer, href) {
        warpjsUtils.getCurrentPageHAL($, href)
            .then((result) => {
                this._resultDataCache[href].pending = false;
                this._resultDataCache[href].result = result.data;

                this.extractDataAndShowPreview($, modalItemPreviewContainer, result.data);
            });
    }

    toggle($, event) {
        const target = $(event.currentTarget);
        const previewContainer = $(event.currentTarget).next();
        const href = target.data('href');

        if (target.hasClass('collapsed')) {
            target.removeClass('collapsed');
            if (this._resultDataCache[href]) {
                if (!this._resultDataCache[href].pending) {
                    this.extractDataAndShowPreview($, previewContainer, this._resultDataCache[href].result);
                }
            } else {
                this._resultDataCache[href] = {
                    pending: true,
                    result: null
                };

                this.showPreview($, previewContainer, "...loading");
                this.getResults($, previewContainer, href);
            }
        } else {
            target.addClass('collapsed');
            this.hidePreview($, previewContainer);
        }
    }
}

module.exports = MapMarkerModalPreview;
