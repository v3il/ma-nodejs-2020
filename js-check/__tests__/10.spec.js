const Storage = require('../10');

describe('Storage', () => {
    it('creates a storage properly', () => {
        const storage = new Storage();
        expect(storage.storage instanceof Map).toBe(true);
    });

    it('sets data correctly', async () => {
        const storage = new Storage();

        await storage.store(null, 1);
        await storage.store(false, 2);
        await storage.store('test', 2);
        await storage.store(Infinity, 2);
        await storage.store(NaN, 2);

        const objKey = {};
        await storage.store(objKey, 2);

        expect(storage.storage.size).toBe(6);
        expect(storage.storage.get(null)).toBe(1);
        expect(storage.storage.get(false)).toBe(2);
        expect(storage.storage.get('test')).toBe(2);
        expect(storage.storage.get(Infinity)).toBe(2);
        expect(storage.storage.get(NaN)).toBe(2);
        expect(storage.storage.get(objKey)).toBe(2);
    });

    it('returns a list of keys correctly', async () => {
        const storage = new Storage();

        await storage.store(null, 1);
        await storage.store(false, 2);
        await storage.store('test', 2);
        await storage.store(Infinity, 2);
        await storage.store(NaN, 2);

        expect(storage.list()).resolves.toStrictEqual([null, false, 'test', Infinity, NaN]);
    });

    it('returns data by key correctly', async () => {
        const storage = new Storage();

        await storage.store(null, 1);
        await storage.store(false, 2);
        await storage.store('test', 2);
        await storage.store(Infinity, 2);
        await storage.store(NaN, 2);

        return expect(Promise.all([
            storage.fetch('test'),
            storage.fetch(null),
            storage.fetch(false),
            storage.fetch(Infinity),
            storage.fetch(NaN),
        ])).resolves.toStrictEqual([2, 1, 2, 2, 2]);
    });

    it('removes data by key correctly', async () => {
        const storage = new Storage();

        await storage.store(null, 1);
        await storage.store(false, 2);
        await storage.store('test', 2);
        await storage.store(Infinity, 2);
        await storage.store(NaN, 2);

        expect(storage.storage.size).toBe(5);

        await storage.destroy('test');
        expect(storage.storage.size).toBe(4);
        expect(storage.storage.has('test')).toBe(false);

        await storage.destroy(null);
        expect(storage.storage.size).toBe(3);
        expect(storage.storage.has(null)).toBe(false);

        await storage.destroy(null);
        expect(storage.storage.size).toBe(3);
    });

    it('sets a list of data correctly', async () => {
        const storage = new Storage();

        await storage.storeList([
            { key: null, data: 1 },
            { key: 'test', data: {} },
            { key: 'blah', data: [] },
        ]);

        expect(storage.storage.size).toBe(3);

        return expect(Promise.all([
            storage.fetch('test'),
            storage.fetch('blah'),
            storage.fetch(null),
        ])).resolves.toStrictEqual([{}, [], 1]);
    });

    it('removes data by beginning of keys correctly', async () => {
        const storage = new Storage();

        await storage.storeList([
            { key: null, data: 1 },
            { key: 'test', data: 2 },
            { key: 'null2', data: 3 },
            { key: 'null4', data: 4 },
            { key: false, data: 5 },
        ]);

        expect(storage.storage.size).toBe(5);

        await storage.destroyStartedWith(null);

        expect(storage.storage.size).toBe(2);

        return expect(storage.list()).resolves.toStrictEqual(['test', false]);
    });

    it('return data by key after setTimeout correctly', async () => {
        const storage = new Storage();

        await storage.storeList([
            { key: null, data: 1 },
            { key: 'test', data: 2 },
            { key: 'null2', data: 3 },
            { key: 'null4', data: 4 },
            { key: false, data: 5 },
        ]);

        const result = await storage.fetchInTimeOrFail('test', 100);
        expect(result).toBe(2);

        storage.fetch = jest.fn().mockImplementation(
            () => new Promise((resolve => setTimeout(() => resolve(2), 1000)))
        );

        try {
            await storage.fetchInTimeOrFail('test', 200);
        } catch (error) {
            expect(error instanceof Error).toBe(true);
            expect(error.name).toBe('TimeoutError');
        }
    });
});