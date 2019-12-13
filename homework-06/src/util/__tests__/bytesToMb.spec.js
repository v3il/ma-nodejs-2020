const bytesToMb = require('../bytesToMb');

describe('bytesToMb', () => {
    it('returns correct value', () => {
        expect(bytesToMb(2 * 1024 ** 2)).toBe(2);
        expect(bytesToMb(2.5 * 1024 ** 2)).toBe(2.5);
    });
});
