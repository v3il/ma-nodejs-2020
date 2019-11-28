module.exports = callback => {
    const result = Math.floor(Math.random() * 7);

    if (callback) {
        if (result) {
            return callback(null, result);
        }

        return callback(new Error());
    }

    if (result) {
        return result;
    }

    throw new Error();
};
