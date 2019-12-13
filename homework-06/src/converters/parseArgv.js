const ArgsVarsConverter = require('./ArgsVarsConverter');

/**
 * Extracts from passed script's arguments key and value of each param and puts them into one object
 * @param params {string[]} - an array of strings of meaningful script arguments (--key=value)
 * @returns {object}
 */
function parseParams(params) {
    return params.reduce((parsedParams, paramString) => {
        const [key, value] = paramString.split('=');
        const parsedKey = key.replace(/^-+/, '');

        return { ...parsedParams, ...Object.fromEntries([[parsedKey, value || '']]) };
    }, {});
}

/**
 * Retrieves by key all requested variables from process.argv and casts the value to needed type.
 * Skips the variable if value can't be converted to requested type
 * @param argv {string[]} - arguments passed to script
 * @param wantedVariables {Object[]} - description of wanted variables. Each object should has `key` and `expectedType` keys
 * @returns {Object} - object which stores all extracted variables and their parsed values
 */
function parseArgv(argv, wantedVariables) {
    const converter = new ArgsVarsConverter();

    const meaningfulParams = argv.slice(2);
    const parsedParams = parseParams(meaningfulParams);

    return wantedVariables.reduce((variables, { key, expectedType }) => {
        const value = parsedParams[key];

        if (value !== undefined) {
            const trimmedValue = value.trim();
            const { parsed, parsedValue } = converter.convert(trimmedValue, expectedType);

            // Skip this variable if value can't be represented as `expectedType` type
            if (parsed) {
                return { ...variables, ...Object.fromEntries([[key, parsedValue]]) };
            }
        }

        return variables;
    }, {});
}

module.exports = { parseParams, parseArgv };
