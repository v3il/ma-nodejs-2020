module.exports = class PrimeNumbersFinder {
    constructor(startNumber = 1) {
        const INITIAL_DIVIDER = 2;

        this.biggestFoundNumber = 0;

        let currentDivider = INITIAL_DIVIDER;
        let numberToCheck = startNumber;

        setInterval(() => {
            const currentNumberIsPrime = currentDivider > Math.sqrt(numberToCheck);
            const stopChecksForCurrentNumber = numberToCheck % currentDivider === 0;

            if (currentNumberIsPrime) {
                this.biggestFoundNumber = numberToCheck;
            }

            if (currentNumberIsPrime || stopChecksForCurrentNumber) {
                currentDivider = INITIAL_DIVIDER;
                numberToCheck += 1;
            } else {
                // Skip all even numbers greater than 2
                currentDivider += (currentDivider === INITIAL_DIVIDER ? 1 : 2);
            }
        }, 0);
    }

    getBiggestFoundNumber() {
        return this.biggestFoundNumber;
    }
};
