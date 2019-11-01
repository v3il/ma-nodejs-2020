function replaceLLetters(text) {
    const str = typeof text === 'string' ? text : `${text}`;
    return str.replace(/l/g, '');
}

function getOLetterPositions(text) {
    const str = typeof text === 'string' ? text : `${text}`;

    return str.split('').reduce((total, current, index) => {
        if (current === 'o') {
            total.push(index + 1);
        }

        return total;
    }, []);
}

function doTask(text) {
    getOLetterPositions(text).forEach(position => console.log(position));
    console.log(replaceLLetters(text));
}

module.exports = { replaceLLetters, getOLetterPositions };