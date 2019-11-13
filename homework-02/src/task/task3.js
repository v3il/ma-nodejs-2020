// I have already had this stuff exported from 'js-check', so I'll just re-use it
const delay = require('../../../js-check/9');

module.exports = (timer, text) => {
    return new Promise(resolve => {
        delay(timer).then(() => resolve(text));
    });
};
