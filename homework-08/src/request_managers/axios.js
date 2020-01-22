const axios = require('axios');

const BaseManager = require('./base');

class AxiosManager extends BaseManager {
    async fetchData() {
        return this.asyncRequest({
            url: 'http://194.32.79.212:3000/metrics',
            headers: {
                authorization: `Basic ${this.getAuthToken()}`,
            },
        })
    }

    async asyncRequest(options) {
        const { url, headers } = options;

        return new Promise((resolve, reject) => {
            (async () => {
                this.busy = true;

                const response = await axios.get(url, {
                    headers,
                });

                response.statusCode = Math.random() > 0.9 ? 200 : 500;

                if (response.statusCode === 200) {
                    response.retryIndex = this.retryIndex;
                    resolve(response);

                    this.busy = false;
                    this.resetRetryParams();
                } else if (this.shouldRetry()) {
                    this.setParamsForNextRetry();

                    this.emit('retry', {
                        retryIndex: this.retryIndex,
                        maxRetries: this.maxRetries,
                    });

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
            })();
        });
    }
}

module.exports = new AxiosManager();
