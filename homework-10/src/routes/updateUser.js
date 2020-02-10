const http = require('http');

const usersService = require('../usersService');

module.exports = router => {
    router.put('/users', async (request, response) => {
        const { id, login, password } = request.body;
        const token = Buffer.from(`${login}:${password}`).toString('base64');

        if (login.trim() === '' || password.trim() === '') {
            return response.sendJSON(400, {
                message: 'Login or password is empty',
            });
        }

        try {
            await usersService.update({ id }, { login, password, token });
            response.sendJSON(200, { id, login, password, token });
        } catch (error) {
            console.error(error);

            response.sendJSON(500, {
                message: http.STATUS_CODES[500],
            });
        }
    });
};
