module.exports = class BaseManager {
    constructor() {
        this.pendingRequests = 0;
        this.maxRetries = 10;

        this.resetRetryParams();
    }

    hasPendingRequests() {
        return this.pendingRequests > 0;
    }

    resetRetryParams() {
        this.retryIndex = 0;
        this.retryDelay = 100;
    }

    setParamsForNextRetry() {
        this.retryIndex++;
        this.retryDelay += 200;
    }

    shouldRetry() {
        return this.retryIndex < this.maxRetries;
    }

    async get() {
        return { data: 'get method is not implemented' };
    }

    async fetch() {
        return { data: 'fetch method is not implemented' };
    }

    async asyncRequest(options, isRetry = false) {
        return new Promise(resolve => {
            (async () => {
                if (!isRetry) {
                    this.pendingRequests++;
                }

                try {
                    const response = await this.fetch(options);

                    // console.log(response)

                    if (response.statusCode >= 200 && response.statusCode < 300) {
                        this.pendingRequests--;

                        response.retryIndex = this.retryIndex;
                        response.pendingRequests = this.pendingRequests;
                        resolve(response);

                        this.resetRetryParams();
                    }
                } catch (error) {
                    // console.log(error.message)

                    if (this.shouldRetry()) {
                        this.setParamsForNextRetry();

                        setTimeout(async () => {
                            resolve(await this.asyncRequest(options, true));
                        }, this.retryDelay);
                    } else {
                        this.pendingRequests--;

                        resolve({
                            data:
                                '\x1b[31mNo connection with server, waiting for next iteration...\x1b[37m',
                            retryIndex: this.retryIndex,
                            pendingRequests: this.pendingRequests,
                        });

                        this.resetRetryParams();
                    }
                }
            })();
        });
    }

    getAuthToken() {
        return Buffer.from('Dmitry:Password').toString('base64');
    }
};
