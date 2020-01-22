const http = require('http');

const BaseManager = require('./base');

class NodeManager extends BaseManager {
    async get(path) {
        const options = {
            path,
            hostname: '194.32.79.212',
            port: 3000,
            method: 'GET',
            headers: {
                authorization: `Basic ${this.getAuthToken()}`,
            },
        };

        return this.asyncRequest(options);
    }

    fetch(options) {
        return new Promise((resolve, reject) => {
            const request = http.request(options, async response => {
                response.setEncoding('utf8');

                try {
                    const responseData = await this.getResponseData(response);
                    response.data = JSON.parse(responseData);
                } catch (error) {
                    response.data = {};
                }

                if (response.statusCode === 200) {
                    resolve(response);
                } else {
                    reject(new Error(`Server responded with status ${response.statusCode}`));
                }
            });

            request.on('error', error => {
                reject(error);
            });

            request.end();
        });
    }

    getResponseData(rawResponse) {
        return new Promise(resolve => {
            let rawData = '';

            rawResponse.on('data', chunk => {
                rawData += chunk;
            });

            rawResponse.on('end', () => {
                resolve(rawData);
            });
        });
    }
}

module.exports = new NodeManager();
