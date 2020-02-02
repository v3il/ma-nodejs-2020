const { Transform } = require('stream');

module.exports = class Transformer extends Transform {
    constructor(limit = 1000) {
        super();
        this.limit = limit;
        this.i = 0;

        this.transferedData = 0;
        this.unsentData = null;

        const id = setInterval(() => {
            this.transferedData = 0;
            if (this.isPaused()) this.resume();
        }, 1000);

        this.on('end', () => {
            clearInterval(id);
            console.log(this.i);
        });

        console.log(limit);
    }

    // eslint-disable-next-line class-methods-use-this,no-underscore-dangle
    _transform(chunk, encoding, done) {
        const maxBytes = 1024 * 1024;

        if (this.isPaused()) {
            console.log('Paused');
        }

        // eslint-disable-next-line no-plusplus
        this.i++;

        // console.log(this.transferedData)

        this.transferedData += chunk.length;

        if (this.transferedData > maxBytes) {
            console.log('Pause');
            this.pause();
        }

        done(null, chunk);
    }
};
