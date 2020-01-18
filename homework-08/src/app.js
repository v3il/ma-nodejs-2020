// const { axiosManager, nodeManager, requestManager } = require('./request_managers');

console.log('Select request manager:');
console.log('1. Node');
console.log('2. Axios');
console.log('3. Request native');

const { stdin } = process;

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', key => {
    switch (key) {
        case '3':
            console.log('Node');
            break;
        case '2':
            console.log('Node');
            break;
        case '1':
        default:
            console.log('Node');
            break;
    }

    stdin.pause();
    console.clear();
});
