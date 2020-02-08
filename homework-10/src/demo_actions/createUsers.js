const { usersService } = require('../services');

const users = [
    {
        login: 'John',
        password: 'secret',
        token: Buffer.from('John:Secret').toString('base64'),
    },

    {
        login: 'Nick',
        password: 'secret',
        token: Buffer.from('Jack:Secret').toString('base64'),
    },
];

module.exports = async () => {
    const promises = users.map(user => usersService.create(user));
    return Promise.all(promises);
};
