module.exports = ($, domList, listItemClassName, searchElementIndex, classToAdd) => {
    $(domList).each((index, element) => {
        const node = $(listItemClassName, element).get(searchElementIndex);

        $(node).addClass(classToAdd);
    });
};
