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
    getLineCount,
    getByteCount,
    getWordCount
};

