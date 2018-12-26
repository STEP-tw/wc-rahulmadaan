class FileHandler {

    constructor(fileName,fs) {
        this.fileName = fileName;
        this.fs=fs;
    };
   readFile() {
       const ENCODING = "utf8";
       return this.fs.readFileSync(this.fileName,ENCODING); 
   };
   isExists() {
        return this.fs.existsSync(this.fileName);
   };
};
exports.FileHandler=FileHandler;