function promisifySetTimeout(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

console.log('Hello!');
promisifySetTimeout(1000).then(() => console.log('Hello2!'))