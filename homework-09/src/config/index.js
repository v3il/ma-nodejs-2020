module.exports = {
    port: process.env.PORT || 3000,
    filePath: './static/image.jpg',
    limit: 512 * 1024,
    minLimit: 128 * 1024,
    dataVolumeToNotify: 1024 * 1024,
    statusSymbol: '.',
};
