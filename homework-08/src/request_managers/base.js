const util = require('util');

const promisifiedSetTimeout = util.promisify(setTimeout);

module.exports = class BaseManager {
    constructor() {
        this.pendingRequests = 0;
        this.maxRetries = 30;
    }

    hasPendingRequests() {
        return this.pendingRequests > 0;
    }

    async get() {
        return { data: 'get method is not implemented' };
    }

    async fetch() {
        return { data: 'fetch method is not implemented' };
    }

    async asyncRequest(
        requestOptions,
        retryOptions = { isRetry: false, retryIndex: 0, retryDelay: 100 },
    ) {
        const { isRetry, retryIndex, retryDelay } = retryOptions;

        if (!isRetry) {
            this.pendingRequests++;
        }

        try {
            // Successful request
            const response = await this.fetch(requestOptions);

            response.retryIndex = retryIndex;
            response.pendingRequests = --this.pendingRequests;

            return response;
        } catch (error) {
            // Failed request
            if (retryIndex < this.maxRetries) {
                await promisifiedSetTimeout(retryDelay);

                // Retry failed request
                return this.asyncRequest(requestOptions, {
                    isRetry: true,
                    retryIndex: retryIndex + 1,
                    retryDelay: retryDelay + 150,
                });
            }

            this.pendingRequests--;

            return {
                data: '\x1b[31mNo connection with server, waiting for next iteration...\x1b[37m',
                retryIndex: this.maxRetries,
                pendingRequests: this.pendingRequests,
            };
        }
    }

    getAuthToken() {
        return Buffer.from('Dmitry:Password').toString('base64');
    }
};
