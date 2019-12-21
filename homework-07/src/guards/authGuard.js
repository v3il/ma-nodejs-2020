const { getConfig } = require('../config');

module.exports = async (request, response) => {
    const { authToken } = getConfig();
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
