const http = require('http');

// const knexInstance = require('./knexInstance');
// const usersService = require('./usersService');

require('./prototypeExtensions');

const Router = require('./Router');
const setupRoutes = require('./routes');

const router = new Router();

router.setStaticDir('client/dist');
router.setViewsDir('src/views');

setupRoutes(router);

http.createServer(async (request, response) => {
    await router.resolve(request, response);
}).listen(process.env.PORT);

// function createUsers() {
//     const users = [
//         { login: 'John', password: 'Secret' },
//         { login: 'Nick', password: 'Secret' },
//     ];
//
//     const promises = users.map(({ login, password }) => {
//         const token = Buffer.from(`${login}:${password}`).toString('base64');
//         return usersService.create({ login, password, token });
//     });
//
//     return Promise.all(promises);
// }
//
// function updateUsers(where, newData) {
//     return usersService.update(where, newData);
// }
//
// (async function() {
//     try {
//         console.log('\x1b[31mInsert\x1b[37m');
//         const insertedIds = await createUsers();
//         console.log(`Successfully added ${insertedIds.length} user(s). IDs are: ${insertedIds}`);
//
//         console.log('\n\x1b[31mFetch\x1b[37m');
//         console.log(await usersService.fetch());
//
//         console.log('\n\x1b[31mUpdate\x1b[37m');
//         const updatedUsersCount = await updateUsers({ id: insertedIds[0] }, { login: 'Dan' });
//         console.log(`Successfully updated ${updatedUsersCount} user(s).`);
//
//         console.log('\n\x1b[31mDelete\x1b[37m');
//         const removedUsersCount = await usersService.delete({ id: insertedIds[1] });
//         console.log(`Successfully removed ${removedUsersCount} user(s).`);
//
//         console.log('\n\x1b[31mFetch\x1b[37m');
//         console.log(await usersService.fetch());
//     } catch (error) {
//         console.log(error);
//     } finally {
//         knexInstance.destroy();
//     }
// })();
