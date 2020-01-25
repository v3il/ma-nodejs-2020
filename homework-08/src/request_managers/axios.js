const axios = require('axios');

const BaseManager = require('./base');

class AxiosManager extends BaseManager {
    async get(url, config = {}) {
        return this.asyncRequest({
            url,
            method: 'get',
            ...config,
        });
    }

    async post(url, body = {}, config = {}) {
        return this.asyncRequest({
            url,
            method: 'post',
            data: body,
            ...config,
        });
    }

    async fetch(options) {
        const response = await axios(options);
        response.statusCode = response.status;
        return response;
    }
}

module.exports = new AxiosManager();
