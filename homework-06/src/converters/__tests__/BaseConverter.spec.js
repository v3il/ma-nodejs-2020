const BaseConverter = require('../BaseConverter');

let instance;

beforeEach(() => {
    instance = new BaseConverter();
});

describe('BaseConverter', () => {
    it('converts correct strings to numbers', () => {
        expect(instance.convertToNumber('100')).toStrictEqual({ parsed: true, parsedValue: 100 });
        expect(instance.convertToNumber('200.5')).toStrictEqual({
            parsed: true,
            parsedValue: 200.5,
        });
    });

    it('converts partly corrected strings to numbers', () => {
        expect(instance.convertToNumber('100test')).toStrictEqual({
            parsed: true,
            parsedValue: 100,
        });
        expect(instance.convertToNumber('200.5asdf%^&^(*')).toStrictEqual({
            parsed: true,
            parsedValue: 200.5,
        });
    });

    it('does not convert bad strings to numbers', () => {
        expect(instance.convertToNumber('')).toStrictEqual({ parsed: false });
        expect(instance.convertToNumber('test')).toStrictEqual({ parsed: false });
        expect(instance.convertToNumber('asdf%^&^(*')).toStrictEqual({ parsed: false });
    });

    it('converts correct strings to boolean', () => {
        expect(instance.convertToBoolean('true')).toStrictEqual({
            parsed: true,
            parsedValue: true,
        });
        expect(instance.convertToBoolean('false')).toStrictEqual({
            parsed: true,
            parsedValue: false,
        });
    });

    it('does not convert bad strings to boolean', () => {
        expect(instance.convertToBoolean('')).toStrictEqual({ parsed: false });
        expect(instance.convertToBoolean('test')).toStrictEqual({ parsed: false });
        expect(instance.convertToBoolean('asdf%^&^(*')).toStrictEqual({ parsed: false });
    });

    it('converts string to requested type (number)', () => {
        instance.convertToNumber = jest.fn();

        instance.convert('100', 'number');
        expect(instance.convertToNumber).toHaveBeenCalled();
    });

    it('converts string to requested type (boolean)', () => {
        instance.convertToBoolean = jest.fn();

        instance.convert('false', 'boolean');
        expect(instance.convertToBoolean).toHaveBeenCalled();
    });

    it('converts string to requested type (other)', () => {
        instance.convertToString = jest.fn();

        instance.convert('false');
        expect(instance.convertToString).toHaveBeenCalled();
    });
});
