const envVarsConverter = require('./EnvVarsConverter');

module.exports = wantedVariables => {
    const variables = {};

    wantedVariables.forEach(({ key, type }) => {
        const value = process.env[key.toUpperCase()];

        if (value) {
            const trimmedValue = value.trim();
            const { parsed, parsedValue } = envVarsConverter.convert(trimmedValue, type);

            if (parsed) {
                variables[key] = parsedValue;
            }
        }
    });

    return variables;
};
