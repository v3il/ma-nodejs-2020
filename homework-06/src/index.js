const bytesToMb = require('./util/bytesToMb');
const mbToBytes = require('./util/mbToBytes');
const colorizeValue = require('./util/colorizeValue');
const getTotalMemory = require('./util/getTotalMemory');
const getFreeMemory = require('./util/getFreeMemory');
const getUsedMemory = require('./util/getUsedMemory');

const parseArgv = require('./converters/parseArgv');
const parseEnvVariables = require('./converters/parseEnvVariables');

const { availableColors, precision } = require('./config');

const defaultParams = {
    rate: 1000,
    limit: 300,
    color: true,
};

const wantedVariables = [
    { key: 'rate', expectedType: 'number' },
    { key: 'limit', expectedType: 'number' },
    { key: 'color', expectedType: 'boolean' },
];

function getColor(colorize, colorResolver) {
    if (!colorize) {
        return availableColors.WHITE;
    }

    return colorResolver();
}

function printTotalMemory() {
    const totalMemory = bytesToMb(getTotalMemory()).toFixed(0);
    console.log(`Total system memory: ${totalMemory}Mb`);
}

function printFreeMemory(limitInBytes, colorize) {
    const freeMemory = getFreeMemory();
    const freeMemoryFormatted = bytesToMb(freeMemory).toFixed(precision);

    const valueColor = getColor(colorize, () =>
        freeMemory < limitInBytes ? availableColors.RED : availableColors.WHITE,
    );
    const colorizedValue = colorizeValue(`${freeMemoryFormatted}Mb`, valueColor);

    console.log(`Free memory available: ${colorizedValue}`);
}

function printUsedMemory() {
    const usedMemoryFormatted = bytesToMb(getUsedMemory()).toFixed(precision);
    console.log(`Allocated memory: ${usedMemoryFormatted}Mb`);
}

function printMemoryDelta(colorize) {
    let prevValue = 0;

    return () => {
        const usedMemory = getUsedMemory();
        const memoryDelta = usedMemory - prevValue;
        const formattedDelta = bytesToMb(memoryDelta).toFixed(precision);

        const valueColor = getColor(colorize, () =>
            memoryDelta < 0 ? availableColors.RED : availableColors.GREEN,
        );
        const colorizedValue = colorizeValue(`${formattedDelta}Mb`, valueColor);

        console.log(`Delta for previous allocated memory value: ${colorizedValue}`);

        prevValue = usedMemory;
    };
}

function printWarningMessage(limitInBytes, colorize) {
    if (getFreeMemory() < limitInBytes) {
        const valueColor = getColor(colorize, () => availableColors.RED);
        const colorizedValue = colorizeValue(
            '!!! ATTENTION: Available memory is under the defined limit !!!',
            valueColor,
        );

        console.log(colorizedValue);
    }
}

function run() {
    const envVariables = parseEnvVariables(wantedVariables);
    const argvVariables = parseArgv(process.argv, wantedVariables);

    const { rate, limit, color } = { ...defaultParams, ...envVariables, ...argvVariables };
    const deltaRenderer = printMemoryDelta(color);

    const limitInBytes = mbToBytes(limit);

    setInterval(() => {
        console.clear();

        console.log(rate, limit, color);

        printTotalMemory();
        printFreeMemory(limitInBytes, color);
        printUsedMemory();
        deltaRenderer();
        printWarningMessage(limitInBytes, color);
    }, rate);
}

run();
