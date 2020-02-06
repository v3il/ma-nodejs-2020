const { Transform } = require('stream');
const { performance } = require('perf_hooks');
const { promisify } = require('util');

const promisifiedSetTimeout = promisify(setTimeout);

module.exports = class SpeedLimiter extends Transform {
    constructor(limit) {
        super();

        this.limit = limit;

        this.transferredDataSize = 0;
        this.transferredDataSizeAccumulator = 0;
        this.iterationStart = performance.now();
    }

    // eslint-disable-next-line no-underscore-dangle
    async _transform(chunk, encoding, done) {
        const defaultChunkSize = 64 * 1024; // bytes
        const dataVolumeToNotify = 1024 * 1024; // bytes
        const iterationDuration = 1000; // milliseconds

        const remainingDataVolume = this.limit - this.transferredDataSize - chunk.length;
        const isLastChunkForThisIteration = remainingDataVolume < defaultChunkSize;

        const remainingTime = this.iterationStart + iterationDuration - performance.now();

        if (isLastChunkForThisIteration && remainingTime > 0) {
            await promisifiedSetTimeout(remainingTime);

            this.iterationStart = performance.now();
            this.transferredDataSize = 0;
        } else {
            this.transferredDataSize += chunk.length;
        }

        this.transferredDataSizeAccumulator += chunk.length;

        if (this.transferredDataSizeAccumulator >= dataVolumeToNotify) {
            this.emit('megabyte-transferred');
            this.transferredDataSizeAccumulator = 0;
        }

        done(null, chunk);
    }
};
