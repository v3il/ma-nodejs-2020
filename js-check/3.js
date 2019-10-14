function replaceLLetters(text) {
    const str = typeof text === 'string' ? text : `${text}`;
    return str.replace(/l/g, '');
}

function getOLetterPositions(text) {
    const str = typeof text === 'string' ? text : `${text}`;
    const oLetterPositions = [];

    str.split('').forEach((letter, index) => {
        if (letter === 'o') {
            oLetterPositions.push(index + 1);
        }
    });

    return oLetterPositions;
}

function doTask(text) {
    getOLetterPositions(text).forEach((position) => console.log(position));
    console.log(replaceLLetters(text));
}

// console.log(doTask('Hello world!'));

module.exports = { replaceLLetters, getOLetterPositions };