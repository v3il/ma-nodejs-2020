const my_number = -1;
var myNumber = 0;
var number = 3;

if (true) {
    const my_number = 1;
    var myNumber = 2;
    var number = 6;
}

const getSum = (first, second, third) => first + second + third;

module.exports = getSum(my_number, myNumber, number);
