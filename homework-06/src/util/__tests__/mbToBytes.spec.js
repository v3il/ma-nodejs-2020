const mbToBytes = require('../mbToBytes');

describe('mbToBytes', () => {
    it('returns correct value', () => {
        expect(mbToBytes(2)).toBe(2 * 1024 ** 2);
        expect(mbToBytes(2.5)).toBe(2.5 * 1024 ** 2);
    });
});
