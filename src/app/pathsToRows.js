const fs = require("fs");
const pipe = require("./pipeline");

// Input: ['/path/to/subtitle1.srt', '/path/to/subtitle2.srt']
// Output: ['row1 + row2', 'row1 + row2']
function readFiles(paths) {
  return paths.map(path => fs.readFileSync(path).toString("utf-8"));
}

// Input: ['row1' + 'row2', 'row1' + 'row2']
// Output: 'f1row1\nf1row2\nf2row1\nf2row2'
function joinFiles(files) {
  return files.reduce((fullText, fileText) => `${fullText}\n${fileText}`);
}

// Input: 'f1row1\nf1row2\nf2row1\nf2row2\n...'
// Output: ['f1row1', 'f1row2', 'f2row1', 'f2row2']
function formatRows(filesContent) {
  return filesContent.split("\n");
}

module.exports = function(paths) {
  return new Promise((resolver, reject) => {
    try {
      resolver(pipe(paths).to(readFiles, joinFiles, formatRows));
    } catch (error) {
      reject(error);
    }
  });
};
