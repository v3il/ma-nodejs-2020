const cast = require('../casters');

module.exports = wantedVariables => {
    const variables = {};

    wantedVariables
        .filter(({ key }) => !!process.env[key.toUpperCase()])
        .forEach(({ key, type }) => {
            const trimmedValue = process.env[key.toUpperCase()].trim();
            const { parsed, parsedValue } = cast(trimmedValue, type);

            if (parsed) {
                variables[key] = parsedValue;
            }
        });

    return variables;
};
