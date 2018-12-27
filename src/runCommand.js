const { fileHandler } = require('./fileHandler.js');
const { getCount } = require('./getCount.js');
const { parseInput } = require('./parseInput.js');
const TAB = "\t";
const SPACE = " ";

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
    return { fileName, contents, wordCount, byteCount, lineCount };
};
const formatter = function (fileName, option, fs) {
    let output = [];
    const data = getDetails(fileName, fs);

    if (option.includes("l")) {
        output.push(data["lineCount"]);
    }
    if (option.includes("w")) {
        output.push(data["wordCount"]);

    }
    if (option.includes("c")) {
        output.push(data["byteCount"]);
    }
    if (option == "") {
        output.push(data["lineCount"]);
        output.push(data["wordCount"]);
        output.push(data["byteCount"]);
    }
 //   output.push(fileName);
    return output;
};
const getTotal = function (list1, list2) {
    let total = [];
    for (let index = 0; index < list1.length; index++) {
        total[index] = list1[index] + list2[index];
    }
    return total;
};

const joinWithTab = function (array) {
    return "\t" +array.join("\t");
};
const wc = function (userArgs, fs) {
    const input = parseInput(userArgs);
    let { option, fileNames } = input;
    let output = fileNames.map(file => formatter(file, option, fs));
    if(fileNames.length > 1){
        let total = output.reduce(getTotal);
        output.push(total);
    }
    fileNames.push('total');
    let index=0;
    const joinedWithTabOutput = output.map(joinWithTab);
    const countsWithFileNames = joinedWithTabOutput.map(x=>x.concat(" "+fileNames[index++])).join('\n');
    return countsWithFileNames;
};

module.exports = {
    wc
};
