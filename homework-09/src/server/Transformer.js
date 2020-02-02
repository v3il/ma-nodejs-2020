const { Transform } = require('stream');

module.exports = class Transformer extends Transform {
    constructor(limit = 1000) {
        super();
        this.limit = limit;
        this.fullData = Buffer.from('');
        this.i = 0;

        this.transferedData = 0;

        setInterval(() => {
            this.transferedData = 0;
            if (this.isPaused()) this.resume();
        }, 1000);

        console.log(limit);
    }

    // eslint-disable-next-line class-methods-use-this,no-underscore-dangle
    _transform(chunk, encoding, callback) {
        // this.pause();

        this.transferedData += chunk.length;

        if (this.transferedData > 1024 ** 2) {
            this.pause();
        }

        // const delta = 1024;

        // console.log(this.i * delta, (this.i + 1) * delta)

        this.fullData += chunk;

        // const a = this.fullData.slice(this.i * delta, (this.i + 1) * delta);

        // this.i++;

        callback(null, chunk);
    }
};
