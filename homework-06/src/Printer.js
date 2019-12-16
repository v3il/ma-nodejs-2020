const colors = {
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    WHITE: '\x1b[37m',
};

module.exports = class Printer {
    constructor(useColors = true) {
        this.useColors = useColors;
        this.colors = colors;
    }

    colorizeString(string, color) {
        const valueColor = this.useColors ? color : this.colors.WHITE;
        return `${valueColor}${string}${this.colors.WHITE}`;
    }

    // eslint-disable-next-line class-methods-use-this
    print(...strings) {
        console.log(...strings);
    }
};
