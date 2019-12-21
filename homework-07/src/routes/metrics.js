const router = require('../Router');

const { authGuard } = require('../guards');

const { getConfig } = require('../config');
const { getUsedMemory, getFreeMemory, getTotalMemory } = require('../util/memory');
const { bytesToMb } = require('../util/spaceConverter');

router.get('/metrics', authGuard, (request, response) => {
    const filter = request.parsedUrl.searchParams.get('filter');

    console.log(getConfig());

    console.log(filter);

    if (filter && !['total', 'free', 'allocated'].includes(filter)) {
        response.sendJSON(400, {
            message: 'Filter value is not valid',
        });
    }

    const { precision, memoryLimit } = getConfig();

    const memoryData = {
        message: 'OK',
    };

    if (!filter || filter === 'total') {
        memoryData.total = parseFloat(bytesToMb(getTotalMemory()).toFixed(precision));
    }

    if (!filter || filter === 'free') {
        const freeMemory = bytesToMb(getFreeMemory());

        memoryData.free = parseFloat(freeMemory.toFixed(precision));

        if (freeMemory < memoryLimit) {
            memoryData.message = 'Available memory is under the defined limit';
        }
    }

    if (!filter || filter === 'allocated') {
        memoryData.allocated = parseFloat(bytesToMb(getUsedMemory()).toFixed(precision));
    }

    response.sendJSON(200, memoryData);
});
