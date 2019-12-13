const colorizeValue = require('../colorizeValue');

const { availableColors } = require('../../config');

describe('colorizeValue', () => {
    it('produces correct value', () => {
        expect(colorizeValue('Test', availableColors.RED)).toBe(
            `${availableColors.RED}Test${availableColors.WHITE}`,
        );
        expect(colorizeValue('Test2', availableColors.WHITE)).toBe(
            `${availableColors.WHITE}Test2${availableColors.WHITE}`,
        );
    });
});
