const cast = require('../casters');

function parseParams(params) {
    const parsedParams = {};
    const regexp = /^--(?<key>.+)=(?<value>.*)$/;

    params.forEach(paramString => {
        const matches = regexp.exec(paramString);

        if (matches) {
            const { key, value } = matches.groups;
            parsedParams[key] = value;
        }
    });

    return parsedParams;
}

module.exports = (argv, wantedVariables) => {
    const variables = {};
    const meaningfulParams = argv.slice(2);
    const parsedParams = parseParams(meaningfulParams);

    wantedVariables
        .filter(({ key }) => parsedParams[key])
        .forEach(({ key, type }) => {
            const trimmedValue = parsedParams[key].trim();
            const { parsed, parsedValue } = cast(trimmedValue, type);

            if (parsed) {
                variables[key] = parsedValue;
            }
        });

    return variables;
};
