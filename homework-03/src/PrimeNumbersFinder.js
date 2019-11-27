module.exports = class PrimeNumbersFinder {
    constructor(startNumber = 1) {
        let numberToCheck = startNumber;
        this.biggestFoundNumber = 0;

        setInterval(() => {
            numberToCheck += 1;

            if (this.checkNumber(numberToCheck)) {
                this.biggestFoundNumber = numberToCheck;
            }
        }, 0);
    }

    checkNumber(number) {
        if (!(number % 2)) {
            return false;
        }

        for (let i = 3; i <= Math.sqrt(number); i += 2) {
            if (!(number % i)) {
                return false;
            }
        }

        return true;
    }

    getBiggestFoundNumber() {
        return this.biggestFoundNumber;
    }
};
