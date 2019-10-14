const { findValueUsingSwitch, findValueUsingIf } = require('../7');

describe('7.js', () => {
    it('findValueUsingIf works correctly', () => {
        expect(findValueUsingIf()).toBe('vegetables');
    });

    it('findValueUsingSwitch works correctly', () => {
        expect(findValueUsingSwitch()).toBe('vegetables');
    });
});