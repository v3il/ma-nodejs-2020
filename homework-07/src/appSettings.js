const authToken = Buffer.from('Dmitry | My secret password').toString('base64');

let appSettings = {
    authToken,
    memoryLimit: 300,
    precision: 3,
};

const getSettings = () => ({ ...appSettings });

const updateSettings = props => {
    appSettings = { ...appSettings, ...props };
};

module.exports = {
    getSettings,
    updateSettings,
};
