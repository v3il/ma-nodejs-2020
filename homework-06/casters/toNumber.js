module.exports = value => {
    const numericValue = parseFloat(value);

    if (!Number.isNaN(numericValue)) {
        return { parsed: true, parsedValue: numericValue };
    }

    return { parsed: false };
};
