class WordCount {

    constructor(contents) {
        this.contents = contents;
    };
    getLineCount() {
        return this.contents.split('\n').length;
    };
    getByteCount() {
        return this.contents.split('').length;
    };
    getWordCount() {
        return this.contents.trim().split('\n').map(x=>x.trim().split(' ').length).reduce((a,b)=>a+b);
    };
};
exports.WordCount=WordCount;
