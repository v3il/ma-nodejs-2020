const { Transform } = require('stream');
const { performance } = require('perf_hooks');

const ITERATION_DURATION = 1000;

module.exports = class SpeedLimiter extends Transform {
    constructor({ dataVolumeToNotify, limit }) {
        super();

        this.limit = limit;
        this.dataVolumeToNotify = dataVolumeToNotify;

        this.transferedDataSize = 0;
        this.unsentData = null;
        this.iterationStart = performance.now();
        this.isNewIteration = false;
        this.transferedDataSizeAccumulator = 0;

        this.on('end', () => {
            // Something was transferred during the very last iteration
            if (this.transferedDataSize > 0) {
                this.emitMbTransferredEvent();
            }
        });
    }

    // eslint-disable-next-line no-underscore-dangle
    _transform(chunk, encoding, done) {
        if (this.isNewIteration) {
            if (this.unsentData) {
                this.push(this.unsentData);
                this.transferedDataSize += this.unsentData.length;

                this.transferedDataSizeAccumulator += this.unsentData.length;
                this.checkAccumulatedDataVolume();

                this.unsentData = null;
            }

            this.isNewIteration = false;
        }

        // Can't send more data in this iteration (limit reached)
        if (this.transferedDataSize + chunk.length > this.limit) {
            // We'll send this data at the beginning of next iteration
            this.unsentData = chunk;

            const remainingTime = this.iterationStart + ITERATION_DURATION - performance.now();

            // Pause stream execution for remaining time
            if (remainingTime > 0) {
                setTimeout(() => {
                    this.isNewIteration = true;

                    this.iterationStart = performance.now();
                    this.transferedDataSize = 0;

                    done();
                }, remainingTime);
            } else {
                done();
            }
        } else {
            this.transferedDataSize += chunk.length;

            this.transferedDataSizeAccumulator += chunk.length;
            this.checkAccumulatedDataVolume();

            done(null, chunk);
        }
    }

    checkAccumulatedDataVolume() {
        if (this.transferedDataSizeAccumulator >= this.dataVolumeToNotify) {
            this.emitMbTransferredEvent();
            this.transferedDataSizeAccumulator = 0;
        }
    }

    emitMbTransferredEvent() {
        this.emit('megabyte-transferred');
    }
};
