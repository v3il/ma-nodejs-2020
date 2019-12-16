const Printer = require('../Printer');

describe('Printer', () => {
    it('prints values', () => {
        console.log = jest.fn();

        const printer = new Printer();

        const cases = [['Test'], ['Test', 'string', 123], ['']];

        cases.forEach(caseArgs => {
            printer.print(...caseArgs);
            expect(console.log).toHaveBeenCalledWith(...caseArgs);
        });
    });

    it('prints colorized values', () => {
        console.log = jest.fn();

        const printer = new Printer();

        printer.print('Test', printer.colorizeString('string', printer.colors.RED));
        expect(console.log).toHaveBeenCalledWith(
            'Test',
            `${printer.colors.RED}string${printer.colors.WHITE}`,
        );
    });

    it('returns colorized values if useColors = true', () => {
        console.log = jest.fn();

        const printer = new Printer();

        expect(printer.colorizeString('Test', printer.colors.GREEN)).toBe(
            `${printer.colors.GREEN}Test${printer.colors.WHITE}`,
        );
    });

    it('does not return colorized values if useColors = false', () => {
        console.log = jest.fn();

        const printer = new Printer(false);

        expect(printer.colorizeString('Test', printer.colors.GREEN)).toBe(
            `${printer.colors.WHITE}Test${printer.colors.WHITE}`,
        );
    });
});
