const { authGuard } = require('../guards');
const { updateConfig } = require('../config');

module.exports = router => {
    router.post('/limit', authGuard, (request, response) => {
        const { limit } = request.body;
        const numericLimit = Number(limit);

        if (Number.isNaN(numericLimit) || numericLimit < 0 || numericLimit > 10e9) {
            response.sendJSON(400, {
                message: 'New value for minimum free memory limit is not valid number',
            });
        } else {
            updateConfig({
                memoryLimit: numericLimit,
            });

            response.sendJSON(200, {
                message: `Minimum free memory limit is successfully set to ${numericLimit} MB`,
            });
        }
    });
};
