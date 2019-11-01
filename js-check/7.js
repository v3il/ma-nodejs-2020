const vegetables = ['potato', 'tomato', 'cucumber'];
const fruits = ['apple', 'pineapple', 'banana'];

const valueToFind = 'cucumber';

function findValueUsingIf() {
    if (vegetables.includes(valueToFind)) {
        return 'vegetables';
    } else if (fruits.includes(valueToFind)) {
        return 'fruits';
    } else {
        return '';
    }
}

function findValueUsingSwitch() {
    switch (vegetables.includes(valueToFind)) {
        case true: return 'vegetables';
        case false: switch (fruits.includes(valueToFind)) {
            case true: return 'fruits';
            case false: return '';
        }
    }
}

module.exports = { findValueUsingIf, findValueUsingSwitch };

