const { Transform } = require('stream');

module.exports = class Transformer extends Transform {
    constructor(limit = 1000) {
        super();
        this.limit = limit;
        this.fullData = Buffer.from('');
        this.i = 0;

        console.log(limit);
    }

    // eslint-disable-next-line class-methods-use-this,no-underscore-dangle
    _transform(chunk, encoding, callback) {
        this.pause();

        setTimeout(() => {
            this.resume();
        }, 1000);

        // const delta = 1024;

        // console.log(this.i * delta, (this.i + 1) * delta)

        this.fullData += chunk;

        // const a = this.fullData.slice(this.i * delta, (this.i + 1) * delta);

        // this.i++;

        callback(null, chunk);
    }
};
