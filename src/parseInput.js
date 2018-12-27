//const hasOption = input => input[0].includes("-");
const hasOnlyFileNames = input => !input[0].includes("-");
const getFileNames = userInput => userInput.filter(file => !file.startsWith("-"));
const getOption = userInput => userInput.filter(file => file.startsWith("-"));

const parseInput = function (args) {
    let option, fileNames;
    if (hasOnlyFileNames(args)) {
        return { option: "", fileNames: args }
    }
    fileNames = getFileNames(args);
    option = getOption(args);
    option = option.map(x => x.slice(1)).join(''); // for removing '-' from given options and array to string
    return { option, fileNames };

};
exports.parseInput = parseInput;
