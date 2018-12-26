const { fileHandler } = require('./fileHandler.js');
const { getCount } = require('./getCount.js');
const { parseInput } = require('./parseInput.js');
const TAB = "\t";

const getDetails = function (fileName, fs) {
    const fileDetails = fileHandler(fileName, fs);
    const counts = getCount(fileDetails.contents);
    if (!fileDetails.isFileExists) {
        return 0;
    }
    const contents = fileDetails.contents;
    const wordCount = counts.wordCount;
    const byteCount = counts.byteCount;
    const lineCount = counts.lineCount;
    return { fileName, contents, wordCount, byteCount, lineCount };
};
const formatter = function (counts) {
    const { lineCount, byteCount, wordCount, fileName } = counts;
    return [TAB, lineCount, TAB, wordCount, TAB, byteCount].join('') + ' ' + fileName;
};
const formatterForOneCounts = function (count, fileName) {
    return [TAB, count].join('') + ' ' + fileName;
};
const availableOptions = {
    'l': 'lineCount',
    'w': 'wordCount',
    'c': 'byteCount'
};
const wc = function (userArgs, fs) {
    const input = parseInput(userArgs);
    const { option, fileNames } = input;
    const data = (getDetails(fileNames.join(''), fs));

    if (input.option !== undefined) {
        const inputOption = availableOptions[option];
        return formatterForOneCounts(data[inputOption], fileNames);
    }
    return formatter(getDetails(fileNames.join(''), fs), fileNames.join(''));
};

module.exports = {
    wc
};