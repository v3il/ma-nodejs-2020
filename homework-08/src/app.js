const util = require('util');

const { axiosManager, nodeManager, requestManager } = require('./request_managers');

const promisifiedSetTimeout = util.promisify(setTimeout);

let retryDelay = 100;
let retryIndex = 0;
let isRetrying = false;

const maxRetries = 50;

async function fetchHandler(fetchManager) {
    console.clear();
    console.log(
        `(${fetchManager.constructor.name})`,
        'Fetching data...',
        retryIndex > 0 ? `Retry ${retryIndex} / ${maxRetries}` : '',
    );

    await promisifiedSetTimeout(retryDelay);

    try {
        const data = await fetchManager.loadData();

        if (data.statusCode === 200) {
            isRetrying = false;
            retryIndex = 0;
            retryDelay = 100;

            console.clear();
            console.log(data.data);
        } else {
            retryIndex++;
            isRetrying = true;
            retryDelay += 100;

            if (retryIndex > maxRetries) {
                console.log('No connection to server, stopping the application');
            } else {
                fetchHandler(fetchManager);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

function getCurrentManager(managerIndex) {
    const mapping = {
        1: nodeManager,
        2: axiosManager,
        3: requestManager,
    };

    return mapping[managerIndex] || nodeManager;
}

function startDataFetching(fetchManager) {
    setInterval(() => {
        if (!isRetrying) {
            console.clear();
            fetchHandler(fetchManager);
        }
    }, 5 * 1000);

    fetchHandler(fetchManager);
}

function prompt() {
    console.clear();
    console.log('Select request manager:');
    console.log('1. Node');
    console.log('2. Axios');
    console.log('3. Request native');

    process.stdin
        .resume()
        .setEncoding('utf8')
        .once('data', key => {
            const currentManager = getCurrentManager(parseInt(key, 10));
            startDataFetching(currentManager);
        });
}

prompt();
