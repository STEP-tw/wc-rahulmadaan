const fileHandler = function (fileName, fs) {
    const isExists = isExists(fileName, fs);
    const contents = readFile(fileName, fs);
    return { isExists, contents };
}
const readFile = function (fileName, fs) {
    const ENCODING = "utf8";
    return fs.readFileSync(fileName, ENCODING);
};
const isExists = function (fileName, fs) {
    return fs.existsSync(fileName);
};

module.exports = {
    fileHandler
}