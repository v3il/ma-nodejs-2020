const http = require('http');

const usersService = require('../usersService');

module.exports = router => {
    router.post('/users', async (request, response) => {
        const { login, password } = request.body;
        const token = Buffer.from(`${login}:${password}`).toString('base64');

        if (login.trim() === '' || password.trim() === '') {
            return response.sendJSON(400, {
                message: 'Login or password is empty',
            });
        }

        try {
            const ids = await usersService.create({ login, password, token });
            response.sendJSON(200, { id: ids[0], login, password, token });
        } catch (error) {
            console.error(error);

            response.sendJSON(500, {
                message: http.STATUS_CODES[500],
            });
        }
    });
};
