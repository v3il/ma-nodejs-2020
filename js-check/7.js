const vegetables = ['potato', 'tomato', 'cucumber'];
const fruits = ['apple', 'pineapple', 'banana'];

const valueToFind = 'cucumber';

function findValueUsingIf() {
    if (vegetables.includes(valueToFind)) {
        return 'vegetables';
    }

    if (fruits.includes(valueToFind)) {
        return 'fruits';
    }
}

function findValueUsingSwitch() {
    switch (vegetables.includes(valueToFind)) {
        case true: return 'vegetables';
    }

    switch (fruits.includes(valueToFind)) {
        case true: return 'fruits';
    }
}

// console.log(findValueUsingIf());
// console.log(findValueUsingSwitch());

module.exports = { findValueUsingIf, findValueUsingSwitch };

