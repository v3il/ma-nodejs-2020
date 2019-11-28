module.exports = callback => {
    const result = Math.floor(Math.random() * 7);

    if (callback) {
        if (result) {
            callback(null, result);
        } else {
            callback(new Error());
        }
    } /* else {
        if (result) {
            return result;
        } else {
            throw new Error();
        }
    } */
};
