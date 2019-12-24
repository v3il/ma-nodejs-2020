const { authGuard } = require('../guards');
const { getSettings } = require('../appSettings');
const { getUsedMemory, getFreeMemory, getTotalMemory } = require('../util/memory');
const { bytesToMb } = require('../util/spaceConverter');

module.exports = router => {
    router.get('/metrics', authGuard, (request, response) => {
        const filter = request.parsedUrl.searchParams.get('filter');

        if (filter && !['total', 'free', 'allocated'].includes(filter)) {
            response.sendJSON(400, {
                message: 'Filter value is not valid',
            });
        }

        const { precision, memoryLimit } = getSettings();

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
};
