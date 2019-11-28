const { performance } = require('perf_hooks');

const INITIAL_DIVIDER = 3;
const CYCLE_MAX_DURATION = 50;

module.exports = class PrimeNumbersFinder {
    constructor(startNumber = 1) {
        this.biggestFoundNumber = 0;
        this.numberToCheck = startNumber;
        this.lastCheckedDivider = INITIAL_DIVIDER;

        this.runNextTick();
    }

    tick() {
        const start = performance.now();

        // Even numbers are not prime
        if (this.numberToCheck % 2 === 0) {
            this.moveToNextNumber();
            return this.runNextTick();
        }

        // Check odd dividers only
        for (let i = this.lastCheckedDivider; i <= Math.sqrt(this.numberToCheck); i += 2) {
            // Time for this iteration is out
            if (performance.now() - start >= CYCLE_MAX_DURATION) {
                this.lastCheckedDivider = i;
                return this.runNextTick(CYCLE_MAX_DURATION * 2);
            }

            // This number is not prime
            if (this.numberToCheck % i === 0) {
                this.moveToNextNumber();
                return this.runNextTick();
            }
        }

        // This number is prime
        this.biggestFoundNumber = this.numberToCheck;
        this.moveToNextNumber();
        return this.runNextTick();
    }

    runNextTick(delay = 0) {
        setTimeout(() => {
            this.tick();
        }, delay);
    }

    moveToNextNumber() {
        this.lastCheckedDivider = INITIAL_DIVIDER;
        this.numberToCheck += 1;
    }

    getBiggestFoundNumber() {
        return this.biggestFoundNumber;
    }
};
