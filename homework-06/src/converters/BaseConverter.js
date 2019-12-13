/* eslint-disable class-methods-use-this */
module.exports = class BaseConverter {
    convertToBoolean(value) {
        if (['false', 'true'].includes(value)) {
            return { parsed: true, parsedValue: value === 'true' };
        }

        return { parsed: false };
    }

    convertToNumber(value) {
        const numericValue = parseFloat(value);

        if (!Number.isNaN(numericValue)) {
            return { parsed: true, parsedValue: numericValue };
        }

        return { parsed: false };
    }

    convertToString(value) {
        return { parsed: true, parsedValue: value };
    }

    convert(value, expectedType) {
        if (expectedType === 'number') {
            return this.convertToNumber(value);
        }

        if (expectedType === 'boolean') {
            return this.convertToBoolean(value);
        }

        return this.convertToString(value);
    }
};
