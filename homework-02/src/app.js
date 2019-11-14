const { task1: sum, task2: earthInstance, task3 } = require('./task');

const boot = async () => {
    console.log(sum);

    const result = await task3;
    console.log(result);

    console.log(earthInstance.describe());
};

boot();
