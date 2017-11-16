module.exports = ($, element) => ({
    name: $(element).data('warpjsName'),
    href: $(element).data('warpjsHref'),
    previewUrl: $(element).data('warpjsPreviewUrl')
});
