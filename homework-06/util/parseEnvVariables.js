module.exports = wantedVariables => {
    const variables = {};

    wantedVariables.forEach(({ key, type }) => {
        const value = process.env[key.toUpperCase()];

        if (!value) {
            return;
        }

        const trimmedValue = value.trim();
        let parsedValue;

        if (type === 'number') {
            const numericValue = parseFloat(trimmedValue);

            if (!Number.isNaN(numericValue)) {
                parsedValue = numericValue;
            }
        } else if (type === 'boolean') {
            if (['false', 'true'].includes(trimmedValue)) {
                parsedValue = trimmedValue === 'true';
            }
        } else {
            parsedValue = trimmedValue;
        }

        if (parsedValue !== undefined) {
            variables[key] = parsedValue;
        }
    });

    return variables;
};
