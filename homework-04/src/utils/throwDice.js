module.exports = callback => {
    const result = Math.floor(Math.random() * 7);

    if (typeof callback === 'function') {
        if (result) {
            return callback(null, result);
        }

        return callback(new Error());
    }
};
