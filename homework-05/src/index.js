const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const { promisify } = require('util');

const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';

const inputDir = path.join(process.cwd(), inputDirName);
const outputFile = path.join(process.cwd(), outputDirName, outputFileName);

async function getInputFileList() {
    const fileNames = await fsp.readdir(inputDir);
    return fileNames.map(fileName => path.join(inputDir, fileName));
}

async function getObjectFromFile(filePath) {
    const compressedBuffer = await fsp.readFile(filePath);
    const buffer = await gunzip(compressedBuffer);
    return JSON.parse(buffer);
}

function rebuildUrl(originalUrl) {
    console.log(originalUrl);
  // Change protocol, path, search string of URL
  // use URL class
  // Example:
  // from URL: http://example.com/files/devices/keyboards.xls
  // to URL: https://example.com/devices?file=keyboards&type=.xls
}

async function buildOutputObject(files) {
    const devices = {};

    for (const filePath of files) {
        const fileObject = await getObjectFromFile(filePath);
        fileObject.url = rebuildUrl(fileObject.url);

        const ext = '.json.gz';
        const fileName = path.basename(filePath.toLowerCase(), ext);

        devices[fileName] = fileObject;
    }

    return devices;
}

async function saveOutput(object) {
    const jsonString = JSON.stringify(object);
    const uncompressedBuffer = Buffer.from(jsonString);
    const compressedBuffer = await gzip(uncompressedBuffer);

    await fsp.writeFile(outputFile, compressedBuffer);
}

async function start() {
  const inputFiles = await getInputFileList();
  const outputObject = await buildOutputObject(inputFiles);
  await saveOutput(outputObject);
}

start().catch(err => console.error('🐞  🤪  🐛\n', err));
