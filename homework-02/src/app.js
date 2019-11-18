const { task1: sum, task2: earthInstance, task3 } = require('./task');

const boot = async () => {
    console.log(sum);

    try {
        const result = await task3;
        console.log(result);
    } catch (error) {
        console.error(error);
    }

    console.log(earthInstance.describe());
};

boot();
