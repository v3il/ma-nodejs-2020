const envVarsConverter = require('./EnvVarsConverter');

/**
 * Retrieves by key all requested variables from process.env and casts the value to needed type.
 * Skips the variable if value can't be converted to requested type
 * @param wantedVariables {Object[]} - description of wanted variables. Each object should has `key` and `expectedType` keys
 * @returns {Object} - object which stores all extracted variables and their parsed values
 */
module.exports = wantedVariables => {
    return wantedVariables.reduce((variables, { key, expectedType }) => {
        const value = process.env[key.toUpperCase()];

        if (value !== undefined) {
            const trimmedValue = value.trim();
            const { parsed, parsedValue } = envVarsConverter.convert(trimmedValue, expectedType);

            // Skip this variable if value can't be represented as `expectedType` type
            if (parsed) {
                return { ...variables, ...Object.fromEntries([[key, parsedValue]]) };
            }
        }

        return variables;
    }, {});
};
