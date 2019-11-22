const PrimeNumbersFinder = require('./PrimeNumbersFinder');

function run() {
    const primeNumbersFinder = new PrimeNumbersFinder();

    setInterval(() => {
        const timestamp = (Date.now() / 1000).toFixed(0);
        const usedMemory = process.memoryUsage().heapUsed;
        const biggestFoundNumber = primeNumbersFinder.getBiggestFoundNumber();

        console.log(
            `${timestamp}: -- IN PROCESS -- Biggest prime number found: ${biggestFoundNumber}. Memory used: ${usedMemory}`,
        );
    }, 1000);
}

run();
