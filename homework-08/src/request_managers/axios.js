const axios = require('axios');

const BaseManager = require('./base');

class AxiosManager extends BaseManager {
    async fetchData() {
        return axios.get('http://194.32.79.212:3060/metrics', {
            headers: {
                authorization: `Basic ${this.getAuthToken()}`,
            },
        });
    }
}

module.exports = new AxiosManager();
