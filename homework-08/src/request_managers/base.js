module.exports = class BaseManager {
    async fetchData() {
        return {};
    }

    async loadData() {
        const data = await this.fetchData();
        return { ...data, ...{ statusCode: Math.random() > 0.9 ? 200 : 500 } };
    }

    getAuthToken() {
        return Buffer.from('Dmitry | My secret password').toString('base64');
    }
};
