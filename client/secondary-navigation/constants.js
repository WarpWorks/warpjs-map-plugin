const CONTAINER = '.secondary-navigation';
const LIST_ITEMS = '.navigation-list';
const LIST_ITEM = `${LIST_ITEMS} .list-item`;

module.exports = {
    CONTAINER,
    FIRST_CHILD: `${LIST_ITEM}:first-child`,
    LIST_ITEM,
    LIST_ITEMS,
    SELECTED_CLASS: 'active-outer-button'
};
