const _ = require('lodash');

function getPrevStyleAndModifyElement($, element, elementIndex, previousStyle, styleClass) {
    const elementsCurrentStyle = $(element).hasClass(styleClass) ? styleClass : '';

    if (elementIndex === 0 || previousStyle !== '') {
        $(element).addClass(styleClass);
    } else {
        $(element).removeClass(styleClass);
    }

    return elementsCurrentStyle;
}

function updateElementsWithClass($, listOfElements, firstOrLastElement, className) {
    if ($(firstOrLastElement).hasClass(className)) {
        _.reduce(listOfElements, (previousStyle, element, index) => {
            return getPrevStyleAndModifyElement($, element, index, previousStyle, className);
        }, '');
    }
}

function paginate($, paginationSettings, liList, direction) {
    let directionalIndex, listToIterateOn;
    listToIterateOn = liList.get();

    if (direction === 'next') {
        directionalIndex = listToIterateOn.length - 1;
    } else {
        directionalIndex = 0;
        listToIterateOn = listToIterateOn.reverse();
    }

    _.forEach(paginationSettings, (liNodesToShowAtScreenSize, className) => {
        updateElementsWithClass($, listToIterateOn, liList[directionalIndex], className);
    });
}

function hideOrDisplayArrow($, paginationSettings, firstOrLastLiNode, previousOrNextArrow) {
    _.forEach(paginationSettings, (liNodesToShowAtScreenSize, className) => {
        if ($(firstOrLastLiNode).hasClass(className)) {
            $(previousOrNextArrow).removeClass(className);
        } else {
            $(previousOrNextArrow).addClass(className);
        }
    });
}

function generateInitialElementStyles($, paginationSettings, listOfElements) {
    _.forEach(paginationSettings, (liNodesToShowAtScreenSize, className) => {
        _.forEach(listOfElements, (liNode, index) => {
            if (index < liNodesToShowAtScreenSize) {
                $(liNode).removeClass(className);
            }
        });
    });
}

module.exports = {
    hideOrDisplayArrow,
    generateInitialElementStyles,
    paginate
};
