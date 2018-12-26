const hasOption = input => input[0].includes("-");
const hasOnlyFileNames = input => !input[0].includes("-");

const parseInput = function (args = []) {
    let option, fileNames;
    if (hasOption(args)) {
        option = args[0].slice(0, 2);
        fileNames = args.slice(1);
        return { option, fileNames }
    }
    if (hasOnlyFileNames(args)) {
        return { option, fileNames: args }
    }
    
};
exports.parseInput=parseInput;