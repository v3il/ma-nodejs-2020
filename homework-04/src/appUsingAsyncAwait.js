const { promisify } = require('util');

const throwDice = require('./utils/throwDice');

const promisifiedThrowDice = promisify(throwDice);
const promisifiedSetTimeout = promisify(setTimeout);

module.exports = async () => {
    console.log('\nThrowing dices inside async function');

    try {
        await promisifiedSetTimeout(700);
        const firstThrowResult = await promisifiedThrowDice();
        console.log(`First throw, got result ${firstThrowResult}`);

        await promisifiedSetTimeout(1300);
        const secondThrowResult = await promisifiedThrowDice();
        console.log(`Second throw, got result ${secondThrowResult}`);

        await promisifiedSetTimeout(1000);
        console.log(`Points sum is ${firstThrowResult + secondThrowResult}`);
    } catch (error) {
        console.log(error.message);
    }
};
