const isPrimeNumber = require('./utils/isPrimeNumber');

module.exports = class PrimeNumbersFinder {
    constructor() {
        let numberToCheck = 0;
        this.biggestFoundNumber = 0;

        setInterval(() => {
            numberToCheck += 1;

            if (isPrimeNumber(numberToCheck)) {
                this.biggestFoundNumber = numberToCheck;
            }
        }, 0);
    }

    getBiggestFoundNumber() {
        return this.biggestFoundNumber;
    }
};
