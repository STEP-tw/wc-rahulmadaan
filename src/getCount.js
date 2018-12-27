const splitByWords = content => content.split(/ |\n/).filter(x => x).length;
const NEWLINE = "\n";

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
    return splitByWords(contents)
};

module.exports = {
    getCount
};

