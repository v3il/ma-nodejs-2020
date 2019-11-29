const throwDice = require('./utils/throwDice');

module.exports = () => {
    console.log('Throwing dices inside callbacks');

    setTimeout(() => {
        throwDice((firstThrowError, firstThrowResult) => {
            if (firstThrowError) {
                console.log(firstThrowError.message);
            } else {
                console.log(`First throw, got result ${firstThrowResult}`);

                setTimeout(() => {
                    throwDice((secondThrowError, secondThrowResult) => {
                        if (secondThrowError) {
                            console.log(secondThrowError.message);
                        } else {
                            console.log(`Second throw, got result ${secondThrowResult}`);

                            setTimeout(() => {
                                console.log(
                                    `Points sum is ${firstThrowResult + secondThrowResult}`,
                                );
                            }, 1000);
                        }
                    });
                }, 1300);
            }
        });
    }, 700);
};
