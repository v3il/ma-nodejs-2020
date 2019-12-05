const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const { promisify } = require('util');

const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';
const outputTextFileName = 'result.json';

const inputDir = path.join(process.cwd(), inputDirName);
const outputFile = path.join(process.cwd(), outputDirName, outputFileName);
const outputTextFile = path.join(process.cwd(), outputDirName, outputTextFileName);

async function getInputFileList() {
    let fileNames = [];

    try {
        fileNames = await fsp.readdir(inputDir);
    } catch (error) {
        console.error(`Can't read the directory ${inputDir}`);
    }

    return fileNames.map(fileName => path.join(inputDir, fileName));
}

async function getObjectFromFile(filePath) {
    let compressedBuffer;

    try {
        compressedBuffer = await fsp.readFile(filePath);
    } catch (error) {
        console.error(`An error occurred while reading the file "${filePath}"`, error);
    }

    let buffer;

    try {
        buffer = await gunzip(compressedBuffer);
    } catch (error) {
        console.error('An error occurred during data decompression', error);
    }

    try {
        return JSON.parse(buffer);
    } catch (error) {
        console.error(`File "${filePath}" contains invalid JSON data`);
    }

    return {};
}

function rebuildUrl(originalUrl) {
    const parsedURL = new URL(originalUrl);
    parsedURL.protocol = 'https';
    parsedURL.pathname = 'devices';

    const { ext, name } = path.parse(originalUrl);
    parsedURL.searchParams.append('file', name);
    parsedURL.searchParams.append('type', ext);

    return parsedURL.toString();
}

async function buildOutputObject(files) {
    const devices = {};

    // eslint-disable-next-line
    for (const filePath of files) {
        let fileObject;

        try {
            // eslint-disable-next-line
            fileObject = await getObjectFromFile(filePath);
        } catch (error) {
            console.error(
                `An error occurred while reading the content of file "${filePath}"`,
                error,
            );
        }

        fileObject.url = rebuildUrl(fileObject.url);

        const ext = '.json.gz';
        const name = path.basename(filePath.toLowerCase(), ext);

        devices[name] = fileObject;
    }

    return devices;
}

async function saveOutput(object) {
    const jsonString = JSON.stringify(object);
    const uncompressedBuffer = Buffer.from(jsonString);

    let compressedBuffer;

    try {
        compressedBuffer = await gzip(uncompressedBuffer);
    } catch (error) {
        console.error('An error occurred during data compression', error);
    }

    try {
        await fsp.writeFile(outputFile, compressedBuffer);
    } catch (error) {
        console.error(`An error occurred while writing the file "${outputFileName}"`, error);
    }

    try {
        await fsp.writeFile(outputTextFile, JSON.stringify(object, null, 4));
    } catch (error) {
        console.error(`An error occurred while writing the file "${outputTextFileName}"`, error);
    }
}

async function start() {
    const inputFiles = await getInputFileList();
    const outputObject = await buildOutputObject(inputFiles);
    await saveOutput(outputObject);
}

start().catch(err => console.error('🐞  🤪  🐛\n', err));
