const getFlatArray = require('../6');

describe('6.js', () => {
    it('getFlatArray works correctly', () => {
        expect(getFlatArray(1, 2, 3)).toStrictEqual([]);
        expect(getFlatArray(null)).toStrictEqual([]);
        expect(getFlatArray([1, 2], [3])).toStrictEqual([2, undefined, 1, 3]);
        expect(getFlatArray([1, 2, 3, 4, 5], [6, 7, 8, 9, 0])).toStrictEqual([5, 0, 4, 9, 3, 8, 2, 7, 1, 6]);
        expect(getFlatArray([1, 2], [3, 4], [5, 6])).toStrictEqual([2, 4, 6, 1, 3, 5]);
        expect(getFlatArray(['a', 'b'], ['c', 'd'], [1, false])).toStrictEqual(['b', 'd', false, 'a', 'c', 1]);
        expect(getFlatArray([1, 2])).toStrictEqual([2, 1]);
        expect(getFlatArray([1])).toStrictEqual([1]);
        expect(getFlatArray([])).toStrictEqual([]);
    });
});