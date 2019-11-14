const textResolver = (timer, text) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(text);
        }, timer);
    });
};

module.exports = textResolver(1000, 'Hello from task3');
