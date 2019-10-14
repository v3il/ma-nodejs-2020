// Дано клас Storage, що є SDK для доступу до якогось сховища даних по текстовому ключу. При цьому,
//     кожен метод повертає Promise:
//     Storage
// list() повертає Promise, який зарезолвиться масивом ключів
// fetch(key) повертає Promise, який зарезолвиться даними
// store(key, data) повертає Promise
// destroy(key) повертає Promise
// Потрібно реалізувати нові методи (що також повертатимуть Promise):
// storeList([{key, data}])
// destroyStartedWith(beginningOfKey)
// fetchInTimeOrFail(key, timeout)
// Додаткова умова (не обов’язково, за бажанням):
// Сховище має ліміт на записування та читання по 5 операцій одночасно для одного клієнта.

class Storage {
    constructor() {
        this.storage = new Map();
    }

    async list() {
        return [...this.storage.keys()];
    }

    async fetch(key) {
        return this.storage.get(key);
    }

    async store(key, data) {
        return this.storage.set(key, data);
    }

    async destroy(key) {
        return this.storage.delete(key);
    }

    async storeList(list) {
        for (const item of list) {
            const { key, data } = item;
            await this.store(key, data);
        }
    }

    async destroyStartedWith(beginningOfKey) {
        const allKeys = await this.list();
        const beginningOfKeyIndex = allKeys.findIndex(item => item === beginningOfKey);
        const keysToRemove = allKeys.splice(beginningOfKeyIndex);

        for (const key of keysToRemove) {
            await this.destroy(key);
        }
    }

    async fetchInTimeOrFail(key, timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                const data = await this.fetch(key);

                if (data) {
                    resolve(data);
                } else {
                    reject();
                }
            }, timeout);
        });
    }
}

(async () => {
    const s = new Storage();
    s.store(1, 1);
    s.storeList([{key: 3, data: 2}, {key: 5, data: 1}]);
    console.log(await s.list(2));
    // await s.destroyStartedWith(3);
    console.log(await s.fetchInTimeOrFail(3, 4000))
    console.log(await s.list());
})();
