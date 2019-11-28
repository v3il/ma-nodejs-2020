module.exports = class PrimeNumbersFinder {
    constructor(startNumber = 1) {
        const INITIAL_DIVIDER = 2;

        this.biggestFoundNumber = 0;

        let currentDivider = INITIAL_DIVIDER;
        let numberToCheck = startNumber;

        setInterval(() => {
            const allDividersChecked = currentDivider > Math.sqrt(numberToCheck);
            const currentNumberIsNotPrime = numberToCheck % currentDivider === 0;

            if (allDividersChecked) {
                this.biggestFoundNumber = numberToCheck;
            }

            if (allDividersChecked || currentNumberIsNotPrime) {
                currentDivider = INITIAL_DIVIDER;
                numberToCheck += 1;
            } else {
                // Skip all even numbers greater than 2
                currentDivider += currentDivider === INITIAL_DIVIDER ? 1 : 2;
            }
        }, 0);
    }

    getBiggestFoundNumber() {
        return this.biggestFoundNumber;
    }
};
