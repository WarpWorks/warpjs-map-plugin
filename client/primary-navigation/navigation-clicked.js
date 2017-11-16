/**
 *  This module update the primary navigation. It will hide/show elements that
 *  should be visible. It also update the navigation caret to hide/show when
 *  necessary. It does this for each screen size.
 */
const _ = require('lodash');

const constants = require('./constants');

module.exports = ($, element) => {
    const items = $(constants.LIST_ITEM, constants.LIST_ITEMS).get();
    const len = items.length;
    const delta = $(element).hasClass('pagination-next') ? 1 : -1;

    _.forIn(constants.ELEMENT_COUNTS, (count, size) => {
        const hiddenClass = `hidden-${size}`;

        // The first element that is shown?
        const shownInSize = items.map((item) => !$(item).hasClass(hiddenClass));
        const firstShown = shownInSize.indexOf(true);

        const newFirstShown = Math.max(0, Math.min(firstShown + delta, len - count));

        // Hide them all
        $(items).addClass(hiddenClass);
        // Show the ones that are in range.
        $(items.slice(newFirstShown, newFirstShown + count)).removeClass(hiddenClass);

        if (newFirstShown) {
            // First not shown.
            $(constants.PAGINATION_PREVIOUS, constants.MAP_HEADER).removeClass(hiddenClass);
        } else {
            $(constants.PAGINATION_PREVIOUS, constants.MAP_HEADER).addClass(hiddenClass);
        }

        if (newFirstShown + count < len) {
            // Last not shown.
            $(constants.PAGINATION_NEXT, constants.MAP_HEADER).removeClass(hiddenClass);
        } else {
            $(constants.PAGINATION_NEXT, constants.MAP_HEADER).addClass(hiddenClass);
        }
    });
};
