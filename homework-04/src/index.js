const appUsingCallbacks = require('./appUsingCallbacks');
const appUsingPromises = require('./appUsingPromises');
const appUsingAsyncAwait = require('./appUsingAsyncAwait');

appUsingCallbacks();

setTimeout(() => {
    appUsingPromises();
}, 4000);

setTimeout(() => {
    appUsingAsyncAwait();
}, 8000);
