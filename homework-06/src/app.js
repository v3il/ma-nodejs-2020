const { bytesToMb, mbToBytes } = require('./util/spaceConverters');
const { getTotalMemory, getFreeMemory, getUsedMemory } = require('./util/memory');

const { parseArgvVariables } = require('./converters/parseArgvVariables');
const parseEnvVariables = require('./converters/parseEnvVariables');

const Printer = require('./Printer');

let printer;

const PRECISION = 3;

function printTotalMemory() {
    const totalMemory = bytesToMb(getTotalMemory()).toFixed(0);
    printer.print(`Total system memory: ${totalMemory}Mb`);
}

function printFreeMemory(limitInBytes) {
    const freeMemory = getFreeMemory();
    const freeMemoryFormatted = bytesToMb(freeMemory).toFixed(PRECISION);

    printer.print(
        `Free memory available:`,
        printer.colorizeString(
            `${freeMemoryFormatted}Mb`,
            freeMemory < limitInBytes ? printer.colors.RED : printer.colors.WHITE,
        ),
    );
}

function printUsedMemory() {
    const usedMemoryFormatted = bytesToMb(getUsedMemory()).toFixed(PRECISION);
    printer.print(`Allocated memory: ${usedMemoryFormatted}Mb`);
}

function printMemoryDelta() {
    let prevValue = 0;

    return () => {
        const usedMemory = getUsedMemory();
        const memoryDelta = usedMemory - prevValue;
        const formattedDelta = bytesToMb(memoryDelta).toFixed(PRECISION);

        printer.print(
            `Delta for previous allocated memory value:`,
            printer.colorizeString(
                `${formattedDelta}Mb`,
                memoryDelta < 0 ? printer.colors.RED : printer.colors.GREEN,
            ),
        );

        prevValue = usedMemory;
    };
}

function printWarningMessage(limitInBytes) {
    if (getFreeMemory() < limitInBytes) {
        printer.print(
            printer.colorizeString(
                '!!! ATTENTION: Available memory is under the defined limit !!!',
                printer.colors.RED,
            ),
        );
    }
}

function getAppSettings() {
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

    const envVariables = parseEnvVariables(wantedVariables);
    const argvVariables = parseArgvVariables(process.argv, wantedVariables);

    return { ...defaultParams, ...envVariables, ...argvVariables };
}

function run() {
    const { rate, limit, color } = getAppSettings();

    printer = new Printer(color);

    const renderDelta = printMemoryDelta();
    const limitInBytes = mbToBytes(limit);

    const tick = () => {
        console.clear();

        printer.print(
            printer.colorizeString(
                `Rate: ${rate}, Limit: ${limit}, Color: ${color}`,
                printer.colors.RED,
            ),
        );

        printTotalMemory();
        printFreeMemory(limitInBytes);
        printUsedMemory();
        renderDelta();
        printWarningMessage(limitInBytes);
    };

    tick();
    setInterval(tick, rate);
}

run();
