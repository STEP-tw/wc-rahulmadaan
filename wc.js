const {getDetails,formatter} = require('./src/runCommand.js');
const fs = require('fs');

const main = function() {
  const fileName = process.argv[2];
  const counts = getDetails(fileName,fs);
  console.log(formatter(counts,fileName));
}
main();

