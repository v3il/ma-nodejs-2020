function getEvenDigits(text) {
    const str = typeof text === 'string' ? text : `${text}`;
    return str.replace(/([^2468])/g, '');
}

// console.log(getEvenDigits('21345A67098'));

module.exports = getEvenDigits;