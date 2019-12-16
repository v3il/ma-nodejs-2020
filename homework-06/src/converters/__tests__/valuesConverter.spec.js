const {
    convertToBoolean,
    convertToNumber,
    convertToString,
    convertEnvValue,
    convertArgvValue,
} = require('../valuesConverter');

describe('convertToNumber', () => {
    it('converts correct strings to numbers', () => {
        expect(convertToNumber('100')).toStrictEqual({ parsed: true, parsedValue: 100 });
        expect(convertToNumber('200.5')).toStrictEqual({
            parsed: true,
            parsedValue: 200.5,
        });
    });

    it('converts partly correct strings to numbers', () => {
        expect(convertToNumber('100test')).toStrictEqual({
            parsed: true,
            parsedValue: 100,
        });
        expect(convertToNumber('200.5asdf%^&^(*')).toStrictEqual({
            parsed: true,
            parsedValue: 200.5,
        });
    });

    it('does not convert bad strings to numbers', () => {
        expect(convertToNumber('')).toStrictEqual({ parsed: false });
        expect(convertToNumber('test')).toStrictEqual({ parsed: false });
        expect(convertToNumber('asdf%^&^(*')).toStrictEqual({ parsed: false });
    });
});

describe('convertToBoolean', () => {
    it('converts correct strings to boolean', () => {
        expect(convertToBoolean('true')).toStrictEqual({
            parsed: true,
            parsedValue: true,
        });
        expect(convertToBoolean('false')).toStrictEqual({
            parsed: true,
            parsedValue: false,
        });
    });

    it('does not convert bad strings to boolean', () => {
        expect(convertToBoolean('')).toStrictEqual({ parsed: false });
        expect(convertToBoolean('test')).toStrictEqual({ parsed: false });
        expect(convertToBoolean('asdf%^&^(*')).toStrictEqual({ parsed: false });
    });
});

describe('convertToString', () => {
    it('converts correct strings to boolean', () => {
        expect(convertToString('test')).toStrictEqual({
            parsed: true,
            parsedValue: 'test',
        });

        expect(convertToString('123')).toStrictEqual({
            parsed: true,
            parsedValue: '123',
        });
    });
});

describe('convertEnvValue', () => {
    it('converts value to string', () => {
        expect(convertEnvValue('100')).toStrictEqual({ parsed: true, parsedValue: '100' });
    });
});

describe('convertArgvValue', () => {
    it('converts empty string to boolean', () => {
        expect(convertArgvValue('', 'boolean')).toStrictEqual({ parsed: true, parsedValue: true });
    });

    it('converts value to string', () => {
        expect(convertArgvValue('100')).toStrictEqual({ parsed: true, parsedValue: '100' });
    });
});
