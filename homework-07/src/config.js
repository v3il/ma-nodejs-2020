const authToken = Buffer.from('Dmitry | My secret password').toString('base64');

let config = {
    authToken,
    memoryLimit: 300,
    precision: 3,
};

const getConfig = () => ({ ...config });
const updateConfig = props => {
    config = { ...config, ...props };
};

module.exports = {
    getConfig,
    updateConfig,
};
