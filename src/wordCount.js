const getCount = function (contents) {
    const lineCount = getLineCount(contents);
    const byteCount = getByteCount(contents);
    const wordCount = getWordCount(contents);
    return { lineCount, byteCount, wordCount };
}
const getLineCount = function (contents) {
    return contents.split('\n').length;
};
const getByteCount = function (contents) {
    return contents.split('').length;
};
const getWordCount = function (contents) {
    return contents.trim().split('\n').map(x => x.trim().split(' ').length).reduce((a, b) => a + b);
};

module.exports = {
    getCount
};

