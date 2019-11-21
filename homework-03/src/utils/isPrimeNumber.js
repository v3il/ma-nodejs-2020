module.exports = number => {
    for (let i = 2; i < number; i++) {
        if (!(number % i)) {
            return false;
        }
    }

    return true;
};
