const throwDice = require('./utils/throwDice');
const promisifySetTimeout = require('./utils/promisifySetTimeout');

module.exports = async () => {
    console.log('\nThrowing dices inside async function');

    try {
        await promisifySetTimeout(700);
        const firstThrowResult = throwDice();
        console.log(`First throw, got result ${firstThrowResult}`);

        await promisifySetTimeout(1300);
        const secondThrowResult = throwDice();
        console.log(`Second throw, got result ${secondThrowResult}`);

        await promisifySetTimeout(1000);
        console.log(`Points sum is ${firstThrowResult + secondThrowResult}`);
    } catch (error) {
        console.log('Lost dice');
    }
};
