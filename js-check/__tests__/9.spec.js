const promisifySetTimeout = require('../9');

describe('promisifySetTimeout', () => {
    it('returns a promise', () => {
        const result = promisifySetTimeout(1000);
        expect(result instanceof Promise).toBe(true);
    });

    it('validates the time properly', () => {
        jest.useFakeTimers();

        promisifySetTimeout(-1000);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);

        promisifySetTimeout(Infinity);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);

        promisifySetTimeout({});
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 0);

        promisifySetTimeout(1000);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    });
});