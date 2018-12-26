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
    '-l': 'lineCount',
    '-w': 'wordCount',
    '-c': 'byteCount'
};
const wc = function (userArgs, fs) {

    const input = parseInput(userArgs);
    const fileName = input.fileNames;
    const data = (getDetails(fileName.join(''), fs));
    if (input.option == "-l") {
        return formatterForOneCounts(data.lineCount, fileName);
    }
    if (input.option == "-w") {
        return formatterForOneCounts(data.wordCount, fileName);
    }
    if (input.option == "-c") {
        return formatterForOneCounts(data.byteCount, fileName);
    }

    return formatter(getDetails(fileName.join(''), fs), fileName.join(''));
}


module.exports = {
    wc
};