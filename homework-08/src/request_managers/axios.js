const axios = require('axios');

const BaseManager = require('./base');

class AxiosManager extends BaseManager {
    async get(url) {
        return this.asyncRequest({
            method: 'get',
            url: `http://194.32.79.212:3000${url}`,
            headers: {
                authorization: `Basic ${this.getAuthToken()}`,
            },
        });
    }

    async post(url, body) {
        console.log(url, body)
    }

    async fetch(options) {
        const response = await axios(options);
        response.statusCode = response.status;
        return response;
    }
}

module.exports = new AxiosManager();
