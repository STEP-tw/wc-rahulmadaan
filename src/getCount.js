const NEWLINE = "\n";
const SPACE = " ";
const getCount = function (contents) {
    const lineCount = getLineCount(contents);
    const byteCount = getByteCount(contents);
    const wordCount = getWordCount(contents);

    return { lineCount, byteCount, wordCount };
}
const getLineCount = function (contents) {
    return contents.split(NEWLINE).length - 1;
};
const getByteCount = function (contents) {
    return contents.split('').length;
};
const getWordCount = function (contents) {
    const splitContent = contents.trim().split(NEWLINE);
    const splitWordsCount = splitContent.map(x => x.trim().split(SPACE).length);
    const wordCount = splitWordsCount.reduce((a, b) => a + b);
    return wordCount;
    // return contents.trim().split(NEWLINE).map(x => x.trim().split(SPACE).length).reduce((a, b) => a + b);
};

module.exports = {
    getCount
};

