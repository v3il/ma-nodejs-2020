const rp = require('request-promise-native');

const BaseManager = require('./base');

class RequestNativeManager extends BaseManager {
    async get(path) {
        const options = {
            uri: `http://194.32.79.212:3000${path}`,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                authorization: `Basic ${this.getAuthToken()}`,
            },
        };

        return this.asyncRequest(options);
    }

    async fetch(options) {
        const response = await rp(options);
        response.data = response.body;
        return response;
    }
}

module.exports = new RequestNativeManager();
