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

// console.log(getFlatArray([1, 2, 3, 4, 5], [6, 7, 8, 9, 0]));

module.exports = getFlatArray;