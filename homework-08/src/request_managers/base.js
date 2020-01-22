module.exports = class BaseManager {
    constructor() {
        this.busy = false;
        this.maxRetries = 10;

        this.resetRetryParams();
    }

    isBusy() {
        return this.busy;
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

    async fetchData() {
        return { data: 'fetchData method is not implemented' };
    }

    getAuthToken() {
        return Buffer.from('Dmitry:Password').toString('base64');
    }
};
