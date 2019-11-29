module.exports = callback => {
    const result = Math.floor(Math.random() * 7);

    if (result) {
        return callback(null, result);
    }

    return callback(new Error('Lost dice'));
};
