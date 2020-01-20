const rp = require('request-promise-native');

const BaseManager = require('./base');

class RequestNativeManager extends BaseManager {
    async fetchData() {
        const response = await rp({
            uri: 'http://194.32.79.212:3060/metrics',
            json: true,
            resolveWithFullResponse: true,
            headers: {
                authorization: `Basic ${this.getAuthToken()}`,
            },
        });

        // Make property name same in all managers
        response.data = response.body;

        return response;
    }
}

module.exports = new RequestNativeManager();
