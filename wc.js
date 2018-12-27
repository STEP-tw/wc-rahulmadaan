const { wc } = require('./src/runCommand.js');
const fs = require('fs');
const readLine = require('readline-sync');
const main = function () {
  const userArgs = process.argv.slice(2);

  console.log(wc(userArgs, fs));
}
main();

