const { getSettings } = require('../appSettings');

module.exports = (request, response) => {
    const { authToken } = getSettings();
    const { authorization: authHeader } = request.headers;

    const isValidHeader = authHeader && authHeader === `Basic ${authToken}`;

    if (!isValidHeader) {
        response.sendJSON(401, {
            message: 'Unauthorized',
        });

        return true;
    }

    return false;
};
