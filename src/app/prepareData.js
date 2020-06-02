const pipe = require("./pipeline");

function removeCarriageReturn(rows) {
  return rows.map(row => row.replace(/\r/g, ""));
}

function removePunctuation(rows) {
  return rows.map(row => row.replace(/[;:,?!.-]/g, ""));
}

function removeOtherChars(rows) {
  return rows.map(row => row.replace(/[\[\]\(\)\{\}'"]/g, ""));
}

function removeUnnecessarySpaces(rows) {
  return rows.map(row => row.trim());
}

function removeTags(rows) {
  return rows.map(row => row.replace(/(<[^>]+)>/g, ""));
}

function mergeRows(rows) {
  return rows.reduce((fullText, row) => `${fullText} ${row}`);
}

function formatWords(words) {
  return words.split(" ");
}

function toLowerCase(words) {
  return words.map(word => word.toLowerCase());
}

function filterValidRow(rows) {
  return rows.filter(row => {
    const notNumber = !parseInt(row.trim());
    const notEmpty = !!row.trim();
    const notInterval = !row.includes("-->");

    return notNumber && notEmpty && notInterval;
  });
}

module.exports = function(rows) {
  return new Promise((resolver, reject) => {
    try {
      resolver(
        pipe(rows).to(
          filterValidRow,
          removeTags,
          removePunctuation,
          removeOtherChars,
          removeCarriageReturn,
          removeUnnecessarySpaces,
          mergeRows,
          formatWords,
          toLowerCase
        )
      );
    } catch (error) {
      reject(error);
    }
  });
};
