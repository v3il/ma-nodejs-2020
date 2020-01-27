const { axiosManager, nodeManager, requestManager } = require('./request_managers');

const headers = {
    authorization: `Basic ${Buffer.from('Dmitry:Password').toString('base64')}`,
};

function getMetrics(fetchManager) {
    return fetchManager.get('http://194.32.79.212:3000/metrics', { headers });
}

function getLimit(fetchManager) {
    return fetchManager.get('http://194.32.79.212:3000/limit');
}

function changeLimit(fetchManager) {
    return fetchManager.post(
        'http://194.32.79.212:3000/limit',
        { limit: Math.ceil(Math.random() * 1000) + 10 },
        { headers },
    );
}

function fetchHandler(fetchManager) {
    console.clear();

    console.log(`(${fetchManager.constructor.name}) Sending requests...`);

    [changeLimit(fetchManager), getMetrics(fetchManager), getLimit(fetchManager)].forEach(
        async request => {
            try {
                const { data, retryIndex, pendingRequests, url, method } = await request;

                console.log(`\nReceived data (${method}: ${url}), retry number: ${retryIndex}:`);
                console.log(data);
                console.log(`Pending requests: ${pendingRequests}`);
            } catch (error) {
                console.error(error);
            }
        },
    );
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
        if (fetchManager.hasPendingRequests()) {
            console.log('\n\x1b[32mManager is busy, skip this iteration... \x1b[37m');
        } else {
            fetchHandler(fetchManager);
        }
    }, 12 * 1000);

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
            const fetchManager = getCurrentManager(parseInt(key, 10));
            startDataFetching(fetchManager);
        });
}

prompt();
