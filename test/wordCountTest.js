const { WordCount } = require('../src/wordCount.js');
const { FileHandler } = require('../src/fileHandler');
const assert = require('assert');

const fs = {};
files = {
    "fiveLines.txt": "1\n2\n3\n4\n5",
    "tenLines.txt": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
    "fifteenLines.txt": "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15",
    "noLines.txt": ""
};

fs.readFileSync = function (path, encoding) {
    if (encoding != 'utf8') return;
    const content = files[path];
    if (content == undefined) return "wc: " + path + ": open: No such file or directory";
    return content;
};

fs.existsSync = function (path) {
    if (files[path] == undefined) return false;
    return true;
};
const count = new WordCount("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15");


describe('WordCount', function () {
    it('should return number of lines in the input file', function () {
        assert.equal(count.getLineCount(), 15)
    });
    it('should return number of words in the input file', function () {
        assert.equal(count.getWordCount(), 15)
    });
    it('should return number of charaters in the input file', function () {
        assert.equal(count.getByteCount(), 35);
    });
});

const existingFile = new FileHandler("fifteenLines.txt", fs);
const missingFile = new FileHandler("missing", fs);

describe('FileHandler', function () {
    const expectedOutput = files["fifteenLines.txt"];
    it('should return contents of file if file name is given', function () {
        assert.equal(existingFile.readFile(), expectedOutput)
    });
    it('should return true if file is present', function () {
        assert.equal(existingFile.isExists(), true)
    });
    it('should return false if file name supplied doesnot existsSync', function () {
        assert.deepEqual(missingFile.isExists(), false)
    });
});