const { fileHandler } = require('./fileHandler.js');
const { getCount } = require('./getCount.js');
//const {parseInput} = require('./parseInput.js');
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
    return { contents, wordCount, byteCount, lineCount };
};
const formatter = function (counts, fileName) {
    const { lineCount, byteCount, wordCount } = counts;
    return [TAB, lineCount, TAB, wordCount, TAB, byteCount].join('') + ' ' + fileName;
};

const wc = function (userArgs, fs) {
    return formatter(getDetails(userArgs, fs), userArgs);
}


module.exports = {
    wc
};