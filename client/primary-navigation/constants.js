const MAP_HEADER = '.map-header';
const LIST_ITEMS = `${MAP_HEADER} .header-list-items`;
const LIST_ITEM = '.list-item';
const PAGINATION_PREVIOUS = '.pagination-previous';
const PAGINATION_NEXT = '.pagination-next';

const ELEMENT_COUNTS = {
    lg: 5,
    md: 5,
    sm: 4,
    xs: 3
};

module.exports = {
    ELEMENT_COUNTS,
    LIST_ITEMS,
    FIRST_CHILD: `${LIST_ITEM}:first-child`,
    LIST_ITEM,
    MAP_HEADER,
    PAGINATION_NAVIGATION: `${PAGINATION_PREVIOUS}, ${PAGINATION_NEXT}`,
    PAGINATION_NEXT,
    PAGINATION_PREVIOUS,
    SELECTED_CLASS: 'active-outer-button',
    TITLE: `${MAP_HEADER} .header-label .label-text`
};
