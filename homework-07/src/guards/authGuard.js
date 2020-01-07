const { getSettings } = require('../appSettings');

module.exports = ({ headers }, response) => {
    const { authToken } = getSettings();
    const { authorization: authHeader } = headers;

    const isValidHeader = authHeader && authHeader === `Basic ${authToken}`;

    if (!isValidHeader) {
        response.sendJSON(401, {
            message: 'Unauthorized',
        });

        return true;
    }
};
