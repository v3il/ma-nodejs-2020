const vegetables = ['potato', 'tomato', 'cucumber'];
const fruits = ['apple', 'pineapple', 'banana'];

const valueToFind = 'cucumber';

function findValueUsingIf() {
    if (vegetables.includes(valueToFind)) {
        return 'vegetables';
    } else {
        return 'fruits';
    }
}

function findValueUsingSwitch() {
    switch (vegetables.includes(valueToFind)) {
        case true: return 'vegetables';
        case false: return 'fruits';
    }
}

// console.log(findValueUsingIf());
// console.log(findValueUsingSwitch());

module.exports = { findValueUsingIf, findValueUsingSwitch };

