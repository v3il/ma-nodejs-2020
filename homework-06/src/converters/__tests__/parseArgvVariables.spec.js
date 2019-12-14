const { parseArgvVariables, parseParams } = require('../parseArgvVariables');

describe('parseParams', () => {
    it('extracts variables with dashes', () => {
        const params = ['--rate=500', '--fetch-delay=300', '--colorize'];
        expect(parseParams(params)).toStrictEqual({
            rate: '500',
            'fetch-delay': '300',
            colorize: '',
        });
    });

    it('extracts variables without dashes', () => {
        const params = ['rate=500', 'fetch-delay=300', 'colorize'];
        expect(parseParams(params)).toStrictEqual({
            rate: '500',
            'fetch-delay': '300',
            colorize: '',
        });
    });
});

describe('parseArgv', () => {
    it('extracts requested variables', () => {
        const params = ['', '', '--rate=500', '--fetch-delay=300', '--colorize'];

        const wantedVariables = [
            { key: 'rate', expectedType: 'number' },
            { key: 'fetch-delay', expectedType: 'string' },
            { key: 'colorize', expectedType: 'boolean' },
        ];

        expect(parseArgvVariables(params, wantedVariables)).toStrictEqual({
            rate: 500,
            colorize: true,
            'fetch-delay': '300',
        });
    });

    it("skips variables which values can't be converted to requested type", () => {
        const params = ['', '', '--rate=500', '--fetch-delay=300', '--colorize'];

        const wantedVariables = [
            { key: 'rate', expectedType: 'number' },
            { key: 'fetch-delay', expectedType: 'boolean' },
            { key: 'colorize', expectedType: 'number' },
        ];

        expect(parseArgvVariables(params, wantedVariables)).toStrictEqual({
            rate: 500,
        });
    });

    it('skips variables which are not passed to process.argv', () => {
        const params = ['', '', '--rate=500'];

        const wantedVariables = [
            { key: 'rate', expectedType: 'number' },
            { key: 'color', expectedType: 'boolean' },
            { key: 'test', expectedType: 'string' },
        ];

        expect(parseArgvVariables(params, wantedVariables)).toStrictEqual({
            rate: 500,
        });
    });
});
