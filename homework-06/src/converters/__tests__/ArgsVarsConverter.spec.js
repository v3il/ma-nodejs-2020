const ArgsVarsConverter = require('../ArgsVarsConverter');

let instance;

beforeEach(() => {
    instance = new ArgsVarsConverter();
});

describe('ArgsVarsConverter', () => {
    it('converts correct strings to boolean', () => {
        expect(instance.convertToBoolean('')).toStrictEqual({ parsed: true, parsedValue: true });
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
        expect(instance.convertToBoolean('test')).toStrictEqual({ parsed: false });
        expect(instance.convertToBoolean('123')).toStrictEqual({ parsed: false });
        expect(instance.convertToBoolean('asdf%^&^(*')).toStrictEqual({ parsed: false });
    });
});
