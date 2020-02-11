const http = require('http');

const usersService = require('../usersService');

module.exports = router => {
    router.get('/users', async (request, response) => {
        try {
            const users = await usersService.fetch();
            response.sendJSON(200, { users });
        } catch (error) {
            console.error(error);

            response.sendJSON(500, {
                message: http.STATUS_CODES[500],
            });
        }
    });
};
