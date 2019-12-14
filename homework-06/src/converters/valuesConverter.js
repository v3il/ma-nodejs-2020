function convertToBoolean(value) {
    if (['false', 'true'].includes(value)) {
        return { parsed: true, parsedValue: value === 'true' };
    }

    return { parsed: false };
}

function convertToNumber(value) {
    const numericValue = parseFloat(value);

    if (!Number.isNaN(numericValue)) {
        return { parsed: true, parsedValue: numericValue };
    }

    return { parsed: false };
}

function convertToString(value) {
    return { parsed: true, parsedValue: value };
}

function convert(value, expectedType) {
    if (expectedType === 'number') {
        return convertToNumber(value);
    }

    if (expectedType === 'boolean') {
        return convertToBoolean(value);
    }

    return convertToString(value);
}

function convertArgvValue(value, expectedType) {
    if (expectedType === 'boolean' && !value.length) {
        return { parsed: true, parsedValue: true };
    }

    return convert(value, expectedType);
}

module.exports = {
    convertToString,
    convertToNumber,
    convertToBoolean,
    convertArgvValue,
    convertEnvValue: convert,
};
