module.exports = (associations, doc, type, parentRelnName) => {
    if (!doc.coordinates) {
        doc.coordinates = [];
    }

    const filteredAssociations = associations.filter((assoc) => assoc.name === parentRelnName);
    const references = filteredAssociations.length ? filteredAssociations[0].getTargetReferences(doc) : [];

    doc.coordinates = doc.coordinates.concat(references.map((reference) => {
        return {
            id: reference._id,
            type,
            desc: reference.desc

        };
    }));

    return doc;
};
