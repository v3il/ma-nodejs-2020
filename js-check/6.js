function getFlatArray(...arrays) {
    if (arrays.some(array => !Array.isArray(array))) {
        return [];
    }

    let maxIndex = Math.max.apply(null, arrays.map(array => array.length)) - 1;
    let result = [];

    while (maxIndex >= 0) {
        arrays.forEach((array) => {
            result.push(array[maxIndex]);
        });

        maxIndex--;
    }

    return result;
}

module.exports = getFlatArray;