const rp = require('request-promise-native');

const BaseManager = require('./base');

class RequestNativeManager extends BaseManager {
    async fetchData() {
        const options = {
            uri: 'http://194.32.79.212:3000/metrics',
            json: true,
            resolveWithFullResponse: true,
            headers: {
                authorization: `Basic ${this.getAuthToken()}`,
            },
        };

        return this.asyncRequest(options);
    }

    async asyncRequest(options) {
        return new Promise((resolve, reject) => {
            (async () => {
                this.busy = true;

                const response = await rp(options);

                // Make property name same in all managers
                response.data = response.body;
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

module.exports = new RequestNativeManager();
