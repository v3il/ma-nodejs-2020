const { mbToBytes, bytesToMb } = require('../spaceConverters');

describe('mbToBytes', () => {
    it('returns correct value', () => {
        expect(mbToBytes(2)).toBe(2 * 1024 ** 2);
        expect(mbToBytes(2.5)).toBe(2.5 * 1024 ** 2);
    });
});

describe('bytesToMb', () => {
    it('returns correct value', () => {
        expect(bytesToMb(2 * 1024 ** 2)).toBe(2);
        expect(bytesToMb(2.5 * 1024 ** 2)).toBe(2.5);
    });
});
