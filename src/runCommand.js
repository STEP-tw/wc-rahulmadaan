const { fileHandler } = require('./fileHandler.js');
const { getCount } = require('./getCount.js');
const { parseInput } = require('./parseInput.js');
const TAB = "\t";
const SPACE = " ";

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
const formatterForOneOption = function (count, fileName) {
    return [TAB, count].join('') + ' ' + fileName;
};
const availableOptions = {
    'l': 'lineCount',
    'w': 'wordCount',
    'c': 'byteCount'
};

const newFunction = function (fileName, option, fs) {
    let output = "";
    if (option == "") {
        output = output + TAB + getDetails(fileName.join(''), fs)['lineCount'];
        output = output + TAB + getDetails(fileName.join(''), fs)['wordCount'];
        output = output + TAB + getDetails(fileName.join(''), fs)['byteCount'];
    }
    if (option.includes('l')) {
        output = output + TAB + getDetails(fileName.join(''), fs)['lineCount'];
    }
    if (option.includes('w')) {
        output = output + TAB + getDetails(fileName.join(''), fs)['wordCount'];

    }
    if (option.includes('c')) {
        output = output + TAB + getDetails(fileName.join(''), fs)['byteCount'];
    }
    return output + ' ' + fileName;
};

const wc = function (userArgs, fs) {
    const input = parseInput(userArgs);
    let { option, fileNames } = input;
    //const data = getDetails(fileNames.join(''), fs);
    if (option == undefined) {
        option = "";
    }
    //const defaultCase = [undefined, "lcw", "lwc", "wcl", "wlc", "cwl", "clw"]; // undefined -> not given 

    //   let result = '';
    // if (defaultCase.includes(option)) {
    //     return formatter(getDetails(fileNames.join(''), fs), fileNames.join(''));
    // }
    // if (option.includes("")) {
    //     const inputOption = availableOptions[option];
    //     return formatterForOneOption(data[inputOption], fileNames);
    // }
    return newFunction(fileNames, option, fs);
};

module.exports = {
    wc
};
