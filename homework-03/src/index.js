const PrimeNumbersFinder = require('./PrimeNumbersFinder');

function run() {
    const primeNumbersFinder = new PrimeNumbersFinder(999999999999999);

    setInterval(() => {
        const timestamp = (Date.now() / 1000).toFixed(0);
        const biggestFoundNumber = primeNumbersFinder.getBiggestFoundNumber();

        console.log(
            `${timestamp}: -- IN PROCESS -- Biggest prime number found: ${biggestFoundNumber}`,
        );
    }, 1000);
}

run();
