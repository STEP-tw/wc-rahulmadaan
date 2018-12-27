const { getCount } = require('../src/getCount.js');
const { fileHandler } = require('../src/fileHandler');
const { parseInput } = require('../src/parseInput');
const { wc } = require('../src/runCommand.js')
const assert = require('assert');
const TAB = "\t";

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
        const expectedOutput = { option: "", fileNames: ['file1'] }
        assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return multiple file names if multiple file names are given as input with no option', function () {
        const actualOutput = parseInput(['file1', 'file2', 'file3']);
        const expectedOutput = { option: "", fileNames: ['file1', 'file2', 'file3'] };
        assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return parse multiple file names along with one option given in input', function () {
        const actualOutput = parseInput(["-l", 'file1', 'file2', 'file3', 'file4']);
        const expectedOutput = { option: "l", fileNames: ['file1', 'file2', 'file3', 'file4'] };
        assert.deepEqual(actualOutput, expectedOutput)
    });
    it('should return no option and fileNames if no input is given', function () {
        const actualOutput = parseInput(['']);
        const expectedOutput = { option: "", fileNames: [''] };
        assert.deepEqual(actualOutput, expectedOutput);
    });
});
describe('wc', function () {
    it('should return line,byte and word count for single file name given in input', function () {
        const actualOutput = wc(['fifteenLines.txt'], fs);
        const expectedOutput = TAB + 14 + TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
        assert.deepEqual(actualOutput, expectedOutput)
    });
    describe('for one option in input', function () {
        it('should return only line count if -l option is given in input', function () {
            const actualOutput = wc(['-l', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + ' ' + 'fifteenLines.txt'
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only word count if -w option is given in input', function () {
            const actualOutput = wc(['-w', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 15 + ' ' + 'fifteenLines.txt'
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only line count if -l option is given in input', function () {
            const actualOutput = wc(['-c', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 35 + ' ' + 'fifteenLines.txt'
            assert.deepEqual(actualOutput, expectedOutput)
        });
    });
    describe('for multiple option in one argument in input', function () {
        it('should return only all counts if -lcw option is given in input', function () {
            const actualOutput = wc(['-lcw', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only all counts if -wlc option is given in input', function () {
            const actualOutput = wc(['-wlc', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only all counts if -wcl option is given in input', function () {
            const actualOutput = wc(['-wcl', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only all counts if -lwc option is given in input', function () {
            const actualOutput = wc(['-lwc', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only line and word count if -lw option is given in input', function () {
            const actualOutput = wc(['-lw', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 15 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only line and word count if -wl option is given in input', function () {
            const actualOutput = wc(['-wl', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 15 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only line and byte count if -cl option is given in input', function () {
            const actualOutput = wc(['-cl', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only line and byte count if -lc option is given in input', function () {
            const actualOutput = wc(['-lc', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only word and byte count if -wc option is given in input', function () {
            const actualOutput = wc(['-wc', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only word and byte count if -cw option is given in input', function () {
            const actualOutput = wc(['-cw', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only word count if -ww option is given in input', function () {
            const actualOutput = wc(['-ww', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 15 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only byte count if -cc option is given in input', function () {
            const actualOutput = wc(['-cc', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only line count if -ll option is given in input', function () {
            const actualOutput = wc(['-ll', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only word and byte count if -w,-c option is given in input', function () {
            const actualOutput = wc(['-w', '-c', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });

        it('should return only word and byte count if -c,-w option is given in input', function () {
            const actualOutput = wc(['-c', '-w', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only word count if -w,-w option is given in input', function () {
            const actualOutput = wc(['-w', '-w', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 15 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only byte count if -c,-c option is given in input', function () {
            const actualOutput = wc(['-c', '-c', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only all counts if -l, -c, -w option is given in input', function () {
            const actualOutput = wc(['-l', '-c', '-w', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only all counts if -w, -l, -c option is given in input', function () {
            const actualOutput = wc(['-w', '-l', '-c', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput)
        });
        it('should return only all counts if -w, -c, -l option is given in input', function () {
            const actualOutput = wc(['-w', '-c', '-l', 'fifteenLines.txt'], fs);
            const expectedOutput = TAB + 14 + TAB + 15 + TAB + 35 + ' ' + 'fifteenLines.txt';
            assert.deepEqual(actualOutput, expectedOutput);
        });
        
    });
});