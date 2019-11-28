const throwDice = require('./throwDice');

module.exports = () => {
    console.log('Throwing dices inside callbacks');

    setTimeout(() => {
        throwDice((error, firstThrowResult) => {
            if (error) {
                console.log('Lost dice');
            } else {
                console.log(`First throw, got result ${firstThrowResult}`);

                setTimeout(() => {
                    throwDice((error, secondThrowResult) => {
                        if (error) {
                            console.log('Lost dice');
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
