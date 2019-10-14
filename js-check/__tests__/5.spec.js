const getEvenDigits = require('../5');

describe('5.js', () => {
    it('getEvenDigits works correctly', () => {
        expect(getEvenDigits(null)).toBe('');
        expect(getEvenDigits(undefined)).toBe('');
        expect(getEvenDigits({})).toBe('');
        expect(getEvenDigits([])).toBe('');
        expect(getEvenDigits(NaN)).toBe('');
        expect(getEvenDigits(123)).toBe('2');
        expect(getEvenDigits('123')).toBe('2');
    });
});