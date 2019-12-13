module.exports = class BaseConverter {
    convertToBoolean(value) {
        if (['false', 'true'].includes(value)) {
            return this.generateSuccessfulParsingResponse(value === 'true');
        }

        return this.generateFailedParsingResponse();
    }

    convertToNumber(value) {
        const numericValue = parseFloat(value);

        if (!Number.isNaN(numericValue)) {
            return this.generateSuccessfulParsingResponse(numericValue);
        }

        return this.generateFailedParsingResponse();
    }

    convertToString(value) {
        return this.generateSuccessfulParsingResponse(value);
    }

    convert(value, type) {
        if (type === 'number') {
            return this.convertToNumber(value);
        }

        if (type === 'boolean') {
            return this.convertToBoolean(value);
        }

        return this.convertToString(value);
    }

    static generateSuccessfulParsingResponse(value) {
        return { parsed: true, parsedValue: value };
    }

    static generateFailedParsingResponse() {
        return { parsed: false };
    }
};
