const { getCount } = require('../src/getCount.js');
const { fileHandler } = require('../src/fileHandler');
const { parseInput } = require('../src/parseInput');
const { wc } = require('../src/runCommand.js')
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
        assert.equal(input.lineCount, 14)
    });
    it('should return number of words in the input file', function () {
        assert.equal(input.wordCount, 15)
    });
    it('should return number of charaters in the input file', function () {
        assert.equal(input.byteCount, 35);
    });
});

describe('FileHandler', function () {
    const existingFile = fileHandler("fifteenLines.txt", fs);
    const missingFile = fileHandler('missing', fs);
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
describe('parseInput', function () {
    it('should return option and file name in object if both were given as input', function () {
        const actualOutput = parseInput(['-l', 'file1']);
        const expectedOutput = { option: "l", fileNames: ["file1"] }
        assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return only file name if no option is given as input', function () {
        const actualOutput = parseInput(['file1']);
        const expectedOutput = { option: undefined, fileNames: ['file1'] }
        assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return multiple file names if multiple file names are given as input with no option', function () {
        const actualOutput = parseInput(['file1', 'file2', 'file3']);
        const expectedOutput = { option: undefined, fileNames: ['file1', 'file2', 'file3'] };
        assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return parse multiple file names along with one option given in input', function () {
        const actualOutput = parseInput(["-l", 'file1', 'file2', 'file3', 'file4']);
        const expectedOutput = { option: "l", fileNames: ['file1', 'file2', 'file3', 'file4'] };
        assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return no option and fileNames if no input is given', function () {
        const actualOutput = parseInput(['']);
        const expectedOutput = { option: undefined, fileNames: [''] };
        assert.deepEqual(actualOutput, expectedOutput);
    });
});
describe('wc', function () {
    it('should return line,byte and word count for single file name given as input', function () {
        const actualOutput = wc(['fifteenLines.txt'], fs);
        const expectedOutput = '\t' + 14 + '\t' + 15 + '\t' + 35 + ' ' + 'fifteenLines.txt';
        assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return only line count if -l option is given input', function(){
        const actualOutput= wc(['-l','fifteenLines.txt'],fs);
        const expectedOutput = '\t' + 14 + ' ' + 'fifteenLines.txt'
      assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return only word count if -w option is given input', function(){
        const actualOutput= wc(['-w','fifteenLines.txt'],fs);
        const expectedOutput = '\t' + 15 + ' ' + 'fifteenLines.txt'
      assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return only line count if -l option is given input', function(){
        const actualOutput= wc(['-c','fifteenLines.txt'],fs);
        const expectedOutput = '\t' + 35 + ' ' + 'fifteenLines.txt'
      assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return only line count if -lcw option is given input', function(){
        const actualOutput= wc(['-lcw','fifteenLines.txt'],fs);
        const expectedOutput = '\t' + 14 + '\t' + 15 + '\t' + 35 + ' ' + 'fifteenLines.txt';
      assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return only line count if -wlc option is given input', function(){
        const actualOutput= wc(['-wlc','fifteenLines.txt'],fs);
        const expectedOutput = '\t' + 14 + '\t' + 15 + '\t' + 35 + ' ' + 'fifteenLines.txt';
      assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return only line count if -wcl option is given input', function(){
        const actualOutput= wc(['-wcl','fifteenLines.txt'],fs);
        const expectedOutput = '\t' + 14 + '\t' + 15 + '\t' + 35 + ' ' + 'fifteenLines.txt';
      assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return only line count if -lwc option is given input', function(){
        const actualOutput= wc(['-lwc','fifteenLines.txt'],fs);
        const expectedOutput = '\t' + 14 + '\t' + 15 + '\t' + 35 + ' ' + 'fifteenLines.txt';
      assert.deepEqual(actualOutput, expectedOutput)
    });

 });