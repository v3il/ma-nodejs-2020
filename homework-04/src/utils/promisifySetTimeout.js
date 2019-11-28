module.exports = (time, payload) => {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve(payload);
        }, time),
    );
};
