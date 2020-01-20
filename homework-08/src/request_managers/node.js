const http = require('http');

const BaseManager = require('./base');

class NodeManager extends BaseManager {
    async fetchData() {
        const options = {
            hostname: '194.32.79.212',
            port: 3060,
            path: '/metrics',
            method: 'GET',
            headers: {
                authorization: `Basic ${this.getAuthToken()}`,
            },
        };

        return this.asyncRequest(options);
    }

    asyncRequest(options) {
        return new Promise((resolve, reject) => {
            const request = http.request(options, response => {
                response.setEncoding('utf8');

                let rawData = '';

                response.on('data', chunk => {
                    rawData += chunk;
                });

                response.on('end', () => {
                    try {
                        response.data = JSON.parse(rawData);
                    } catch (error) {
                        response.data = {};
                    }

                    resolve(response);
                });
            });

            request.on('error', error => {
                reject(error);
            });

            request.end();
        });
    }
}

module.exports = new NodeManager();
