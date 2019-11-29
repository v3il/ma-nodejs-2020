const { promisify } = require('util');

const throwDice = require('./utils/throwDice');

const promisifiedThrowDice = promisify(throwDice);
const promisifiedSetTimeout = promisify(setTimeout);

module.exports = () => {
    console.log('\nThrowing dices inside promises');

    Promise.resolve()
        .then(() => {
            return promisifiedSetTimeout(700)
                .then(() => promisifiedThrowDice())
                .then(firstThrowResult => {
                    console.log(`First throw, got result ${firstThrowResult}`);
                    return firstThrowResult;
                });
        })
        .then(firstThrowResult => {
            return promisifiedSetTimeout(1300)
                .then(() => promisifiedThrowDice())
                .then(secondThrowResult => {
                    console.log(`Second throw, got result ${secondThrowResult}`);
                    return [firstThrowResult, secondThrowResult];
                });
        })
        .then(([firstThrowResult, secondThrowResult]) => {
            setTimeout(() => {
                console.log(`Points sum is ${firstThrowResult + secondThrowResult}`);
            }, 1000);
        })
        .catch((error) => {
            console.log(error.message);
        });
};
