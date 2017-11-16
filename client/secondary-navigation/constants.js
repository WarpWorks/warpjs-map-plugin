const CONTAINER = '.map-body';
const LIST_ITEMS = '.navigation-list';
const LIST_ITEM = `${LIST_ITEMS} .list-item`;
const TYPE_ITEMS = '.dropdown-menu .selectable-link-item';

module.exports = {
    CONTAINER,
    FIRST_CHILD: `${LIST_ITEM}:first-child`,
    MATRIX_CONTAINER: `${CONTAINER} .map-table-container`,
    LIST_ITEM,
    LIST_ITEMS,
    SELECTED_CLASS: 'active-outer-button',
    TYPE_ITEMS
};
