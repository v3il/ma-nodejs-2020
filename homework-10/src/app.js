require('dotenv').config();

const knexInstance = require('./knexInstance');
const { createUsers, fetchUsers, updateUsers, removeUsers } = require('./demo_actions');

(async function() {
    try {
        console.log('\x1b[31mInsert\x1b[37m');
        const insertedIds = await createUsers();
        console.log(`Successfully added ${insertedIds.length} user(s). IDs are: ${insertedIds}`);

        console.log('\n\x1b[31mFetch\x1b[37m');
        console.log(await fetchUsers());

        console.log('\n\x1b[31mUpdate\x1b[37m');
        const updatedUsersCount = await updateUsers(insertedIds[0]);
        console.log(`Successfully updated ${updatedUsersCount} user(s).`);

        console.log('\n\x1b[31mDelete\x1b[37m');
        const removedUsersCount = await removeUsers(insertedIds[1]);
        console.log(`Successfully removed ${removedUsersCount} user(s).`);

        console.log('\n\x1b[31mFetch\x1b[37m');
        console.log(await fetchUsers());
    } catch (error) {
        console.log(error);
    } finally {
        knexInstance.destroy();
    }
})();
