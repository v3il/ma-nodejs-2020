const parseEnvVariables = require('../parseEnvVariables');

describe('parseEnvVariables', () => {
    it('extracts requested variables', () => {
        process.env.RATE = '1000';
        process.env.COLOR = 'true';
        process.env.TEST = 'Some string';

        const wantedVariables = [
            { key: 'rate', expectedType: 'number' },
            { key: 'test', expectedType: 'string' },
            { key: 'color', expectedType: 'boolean' },
        ];

        expect(parseEnvVariables(wantedVariables)).toStrictEqual({
            rate: 1000,
            color: true,
            test: 'Some string',
        });
    });

    it("skips variables which values can't be converted to requested type", () => {
        process.env.RATE = 'Skipped value';
        process.env.COLOR = '';
        process.env.TEST = 'Some string';

        const wantedVariables = [
            { key: 'rate', expectedType: 'number' },
            { key: 'color', expectedType: 'boolean' },
            { key: 'test', expectedType: 'string' },
        ];

        expect(parseEnvVariables(wantedVariables)).toStrictEqual({
            test: 'Some string',
        });
    });

    it('skips variables which are not presented in process.env', () => {
        process.env.TEST = 'Some string';

        const wantedVariables = [
            { key: 'rate', expectedType: 'number' },
            { key: 'color', expectedType: 'boolean' },
            { key: 'test', expectedType: 'string' },
        ];

        expect(parseEnvVariables(wantedVariables)).toStrictEqual({
            test: 'Some string',
        });
    });
});
