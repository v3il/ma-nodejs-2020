const cast = require('../casters');

module.exports = wantedVariables => {
    const variables = {};

    wantedVariables.forEach(({ key, type }) => {
        const value = process.env[key.toUpperCase()];

        if (value) {
            const trimmedValue = value.trim();
            const { parsed, parsedValue } = cast(trimmedValue, type);

            if (parsed) {
                variables[key] = parsedValue;
            }
        }
    });

    return variables;
};
