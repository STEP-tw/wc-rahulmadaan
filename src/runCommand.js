const { fileHandler } = require('./fileHandler.js');
const { getCount } = require('./getCount.js');
const {fileHandler} = require('./fileHandler.js');
const getDetails = function (fileName, fs) {
    const fileDetails = fileHandler(fileName, fs);
    const counts = getCount(fileName);
    if (!fileDetails.isFileExists) {
        return 0;
    }
    const contents = fileDetails.contents;
    const wordCount = counts.wordCount;
    const byteCount = counts.byteCount;
    const lineCount = counts.lineCount;
    return { contents, wordCount, byteCount, lineCount };
};
exports.getDetails = getDetails;