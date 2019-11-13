const { task1: getSum, task2: earthInstance, task3: textResolver } = require('./task');

console.log(getSum(1, 2, 3));
console.log(earthInstance.describe());
textResolver(1000, 'Hello from task3').then(console.log);
