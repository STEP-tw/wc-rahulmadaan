const { getCount } = require('../src/getCount.js');
const { fileHandler } = require('../src/fileHandler');
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

describe('WordCount', function () {
    const input = getCount(files["fifteenLines.txt"]);
    it('should return number of lines in the input file', function () {
        assert.equal(input.lineCount, 15)
    });
    it('should return number of words in the input file', function () {
        assert.equal(input.wordCount, 15)
    });
    it('should return number of charaters in the input file', function () {
        assert.equal(input.byteCount, 35);
    });
});

describe('FileHandler', function () {
    const existingFile = fileHandler("fifteenLines.txt",fs);
    const missingFile = fileHandler('missing',fs);
    const expectedOutput = files["fifteenLines.txt"];

    it('should return contents of file if file name is given', function () {
        assert.equal(existingFile.contents, expectedOutput)
    });
    it('should return true if file is present', function () {
        assert.equal(existingFile.isFileExists, true)
    });
    it('should return false if file name supplied doesnot existsSync', function () {
        assert.deepEqual(missingFile.isFileExists, false)
    });
});