module.exports = value => {
    if (['false', 'true'].includes(value)) {
        return { parsed: true, parsedValue: value === 'true' };
    }

    return { parsed: false };
};
