const { axiosManager, nodeManager, requestManager } = require('./request_managers');

async function fetchHandler(fetchManager) {
    console.clear();

    // eslint-disable-next-line no-restricted-syntax
    for (const url of ['/metrics', '/limit']) {
        console.log(`Fetching data from ${url}...`);

        try {
            // eslint-disable-next-line no-await-in-loop
            const response = await fetchManager.fetchData(url);

            console.log(`Received data (${url}), retry number: ${response.retryIndex}:`);
            console.log(response.data);
            console.log('\n');
        } catch (error) {
            console.error(error);
        }
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

async function startDataFetching(fetchManager) {
    setInterval(async () => {
        if (fetchManager.isBusy()) {
            console.log('\x1b[31mManager is busy, skip this iteration...\x1b[37m');
        } else {
            fetchHandler(fetchManager);
        }
    }, 10 * 1000);

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
