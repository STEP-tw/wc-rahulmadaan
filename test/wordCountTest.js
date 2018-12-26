const {WordCount} = require('../src/wordCount.js');
const assert = require('assert');

const fs = {};
files = {
  "fiveLines.txt" : "1\n2\n3\n4\n5",
  "tenLines.txt" : "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
  "fifteenLines.txt" : "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15",
  "noLines.txt": ""
};

fs.readFileSync = function (path, encoding) {
  if (encoding != 'utf8') return;
  const content = files[path];
  if (content == undefined) return "wc: "+path+": open: No such file or directory";
  return content;
};

fs.existsSync = function (path) {
  if (files[path] == undefined) return false;
  return true;
};
const count = new WordCount("1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15");


describe('WordCount', function(){
  it('should return number of lines in the input file' ,function(){
    assert.equal(count.getLineCount(),15)
  });
  it('should return number of words in the input file', function(){
    assert.deepEqual(count.getWordCount(), 15)
  });
  it('should return number of charaters in the input file', function(){
    assert.deepEqual(count.getByteCount(),35);
  });
});