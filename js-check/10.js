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
        const keysToRemove = allKeys.filter(key => `${key}`.startsWith(beginningOfKey));

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

module.exports = Storage;
