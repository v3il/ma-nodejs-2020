function promisifySetTimeout(time) {
    const delay = typeof time === 'number' && Number.isFinite(time) && time >= 0 ? time : 0;
    return new Promise(resolve => setTimeout(resolve, delay));
}

module.exports = promisifySetTimeout;