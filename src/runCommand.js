const { fileHandler } = require('./fileHandler.js');
const { getCount } = require('./getCount.js');
const { parseInput } = require('./parseInput.js');
const TAB = "\t";
const SPACE = " ";

const getDetails = function (fileName, fs) {
    const fileDetails = fileHandler(fileName, fs);
    const counts = getCount(fileDetails.contents);
    if (!fileDetails.isFileExists) {
        //     const contents = "wc: "+fileName+": open: No such file or directory";
        //     return {contents}
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
    const data = getDetails(fileName, fs);

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
    const input = parseInput(userArgs);
    let { option, fileNames } = input;
    return fileNames.map(file => formatter(file, option, fs)).join('\n');
};

module.exports = {
    wc
};
