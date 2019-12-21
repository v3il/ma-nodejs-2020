const bytesToMb = bytes => bytes / 1024 ** 2;
const mbToBytes = mb => mb * 1024 ** 2;

module.exports = {
    bytesToMb,
    mbToBytes,
};
