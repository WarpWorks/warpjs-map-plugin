module.exports = ($, element, imageURL) => {
    const removeBackGroundImage = {"background-image": "none"};
    const addImageUrlToBackground = {"background-image": `url(${imageURL})`};

    $(element).css(removeBackGroundImage);
    $(element).css(addImageUrlToBackground);
};
