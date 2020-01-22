const axios = require('axios');

const BaseManager = require('./base');

class AxiosManager extends BaseManager {
    async get(path) {
        return this.asyncRequest({
            method: 'get',
            url: `http://194.32.79.212:3000${path}`,
            headers: {
                authorization: `Basic ${this.getAuthToken()}`,
            },
        });
    }

    async fetch(options) {
        const response = await axios(options);
        response.statusCode = response.status;
        return response;
    }
}

module.exports = new AxiosManager();
