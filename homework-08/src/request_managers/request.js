const requestPromise = require('request-promise-native');

const BaseManager = require('./base');

class RequestNativeManager extends BaseManager {
    async get(url, config = {}) {
        return this.asyncRequest({
            url,
            uri: url,
            method: 'get',
            json: true,
            resolveWithFullResponse: true,
            ...config,
        });
    }

    async post(url, body = {}, config = {}) {
        return this.asyncRequest({
            url,
            body,
            uri: url,
            method: 'post',
            json: true,
            resolveWithFullResponse: true,
            ...config,
        });
    }

    async fetch(options) {
        const response = await requestPromise(options);
        response.data = response.body;
        return response;
    }
}

module.exports = new RequestNativeManager();
