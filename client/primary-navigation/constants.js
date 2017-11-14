const MAP_HEADER = '.map-header';
const LIST_ITEMS = `${MAP_HEADER} .header-list-items`;
const LIST_ITEM = '.list-item';

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
    PAGINATION_NEXT: '.pagination-next',
    SELECTED_CLASS: 'active-outer-button',
    TITLE: `${MAP_HEADER} .header-label .label-text`
};
