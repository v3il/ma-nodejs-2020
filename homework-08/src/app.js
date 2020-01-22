const { axiosManager, nodeManager, requestManager } = require('./request_managers');

async function fetchHandler(fetchManager) {
    console.clear();

    ['/metrics', '/limit'].forEach(async url => {
        console.log(`Fetching data from ${url}...`);

        try {
            const { data, retryIndex, pendingRequests } = await fetchManager.get(url);

            console.log(`\nReceived data (${url}), retry number: ${retryIndex}:`);
            console.log(data);
            console.log(`Pending requests: ${pendingRequests}`);
        } catch (error) {
            console.error(error);
        }
    });
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
        if (fetchManager.hasPendingRequests()) {
            console.log('\n\x1b[32mManager is busy, skip this iteration... \x1b[37m');
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
