const { fileHandler } = require('./fileHandler.js');
const { getCount } = require('./getCount.js');
const { parseInput } = require('./parseInput.js');
const readLine = require('readline-sync');
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
const formatter = function (fileName, option, fs) {
    let output = "";
    const data = getDetails(fileName.join(''), fs);

    if (option.includes("l")) {
        output = output + TAB + data["lineCount"];
    }
    if (option.includes("w")) {
        output = output + TAB + data["wordCount"];

    }
    if (option.includes("c")) {
        output = output + TAB + data["byteCount"];
    }
    if (option == "") {
        output = output + TAB + data["lineCount"];
        output = output + TAB + data["wordCount"];
        output = output + TAB + data["byteCount"];
    }
    return output + SPACE + fileName;
};

const wc = function (userArgs, fs) {
    if (userArgs.length == 0) {
        while (1) {
          const noQuestion = readLine.question('');
        }
      }
    const input = parseInput(userArgs);
    let { option, fileNames } = input;
    return formatter(fileNames, option, fs);
};

module.exports = {
    wc
};
