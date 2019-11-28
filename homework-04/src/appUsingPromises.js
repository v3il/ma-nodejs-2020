const throwDice = require('./utils/throwDice');
const promisifySetTimeout = require('./utils/promisifySetTimeout');

module.exports = () => {
    console.log('\nThrowing dices inside promises');

    Promise.resolve()
        .then(() => {
            return promisifySetTimeout(700)
                .then(throwDice)
                .then(firstThrowResult => {
                    console.log(`First throw, got result ${firstThrowResult}`);
                    return firstThrowResult;
                });
        })
        .then(firstThrowResult => {
            return promisifySetTimeout(1300)
                .then(throwDice)
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
        .catch(() => {
            console.log('Lost dice');
        });
};
