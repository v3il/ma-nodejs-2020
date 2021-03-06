module.exports = router => {
    router.get('/', async (request, response) => {
        try {
            await response.renderView('index.html');
        } catch (error) {
            console.error('index.html does not exist', error);
            response.redirect('/404');
        }
    });
};
