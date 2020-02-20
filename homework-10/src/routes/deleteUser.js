const usersService = require('../usersService');

module.exports = router => {
    router.delete('/users', async (request, response) => {
        try {
            const { id } = request.body;
            const removedUsersCount = await usersService.delete({ id });

            response.sendJSON(200, {
                affectedRows: removedUsersCount,
            });
        } catch (error) {
            console.error(error);

            response.sendJSON(500, {
                message: error.message,
            });
        }
    });
};
