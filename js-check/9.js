function promisifySetTimeout(time) {
    const delay = typeof time === 'number' && Number.isFinite(time) && time >= 0 ? time : 0;
    return new Promise(resolve => setTimeout(resolve, delay));
}

console.log('Hello!');
promisifySetTimeout(3000).then(() => console.log('Hello2!'));

module.exports = promisifySetTimeout;