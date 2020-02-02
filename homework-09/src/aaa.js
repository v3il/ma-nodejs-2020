const stream = require('stream');
const util = require('util');

const { Duplex } = stream;

/**
 * Duplex stream which:
 *  - generates current time every sec for rstream
 *  - outputs the write stream to stdout
 *
 * Stop the read stream by calling stopTimer
 */
function DRTimeWLog(options) {
    // allow use without new operator
    if (!(this instanceof DRTimeWLog)) {
        return new DRTimeWLog(options);
    }
    Duplex.call(this, options); // init
    this.readArr = []; // array of times to read

    // every second, add new time string to array
    // eslint-disable-next-line no-use-before-define
    this.timer = setInterval(addTime, 1000, this.readArr);
}
util.inherits(DRTimeWLog, Duplex);

/* add new time string to array to read */
function addTime(readArr) {
    readArr.push(new Date().toString());
}

// eslint-disable-next-line no-underscore-dangle
DRTimeWLog.prototype._read = function readBytes(n) {
    const self = this;
    while (this.readArr.length) {
        const chunk = this.readArr.shift();
        if (!self.push(chunk)) {
            break; // false from push, stop reading
        }
    }
    if (self.timer) {
        // continuing if have timer
        // call readBytes again after a second has
        // passed to see if more data then
        setTimeout(readBytes.bind(self), 1000, n);
    } else {
        // we are done, push null to end stream
        self.push(null);
    }
};

/* stops the timer and ends the read stream */
DRTimeWLog.prototype.stopTimer = function() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
};

/* for write stream just ouptut to stdout */
// eslint-disable-next-line no-underscore-dangle
DRTimeWLog.prototype._write = function(chunk, enc, cb) {
    console.log('write: ', chunk.toString());
    cb();
};

// try out DRTimeWLog
const duplex = new DRTimeWLog();
duplex.on('readable', function() {
    let chunk;
    // eslint-disable-next-line no-cond-assign
    while ((chunk = duplex.read()) !== null) {
        console.log('read: ', chunk.toString());
    }
});
duplex.write('Hello \n');
duplex.write('World');
duplex.end();

// after 3 seconds stop the timer
setTimeout(function() {
    duplex.stopTimer();
}, 3000);
