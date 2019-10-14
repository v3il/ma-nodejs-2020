const { getOLetterPositions, replaceLLetters } = require('../3');

describe('3.js', () => {
    it('replaceLLetters method works correctly', () => {
        expect(replaceLLetters(123)).toBe('123');
        expect(replaceLLetters({})).toBe('[object Object]');
        expect(replaceLLetters([])).toBe('');
        expect(replaceLLetters([1])).toBe('1');
        expect(replaceLLetters(undefined)).toBe('undefined');
        expect(replaceLLetters(null)).toBe('nu');
        expect(replaceLLetters('Hello World!')).toBe('Heo Word!');
    });

    it('getOLetterPositions method works correctly', () => {
        expect(getOLetterPositions(123)).toStrictEqual([]);
        expect(getOLetterPositions({})).toStrictEqual([2]); // [object Object]
        expect(getOLetterPositions([])).toStrictEqual([]);
        expect(getOLetterPositions([1])).toStrictEqual([]);
        expect(getOLetterPositions(undefined)).toStrictEqual([]);
        expect(getOLetterPositions(null)).toStrictEqual([]);
        expect(getOLetterPositions('Hello World!')).toStrictEqual([5, 8]);
    });
});