const http = require('http');

const BaseManager = require('./base');

class NodeManager extends BaseManager {
    async fetchData(path) {
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

    async asyncRequest(options) {
        return new Promise((resolve, reject) => {
            this.busy = true;

            const request = http.request(options, async response => {
                response.setEncoding('utf8');

                try {
                    const responseData = await this.getResponseData(response);
                    response.data = JSON.parse(responseData);
                } catch (error) {
                    response.data = {};
                }

                if (response.statusCode === 200) {
                    response.retryIndex = this.retryIndex;
                    resolve(response);

                    this.busy = false;
                    this.resetRetryParams();
                } else if (this.shouldRetry()) {
                    this.setParamsForNextRetry();

                    setTimeout(async () => {
                        resolve(await this.asyncRequest(options));
                    }, this.retryDelay);
                } else {
                    resolve({
                        data: 'No connection with server, waiting for next iteration...',
                        retryIndex: this.retryIndex,
                    });

                    this.busy = false;
                    this.resetRetryParams();
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
