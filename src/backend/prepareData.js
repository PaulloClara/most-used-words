module.exports = rows => {
  return new Promise((resolver, reject) => {
    try {
      const words = rows
        .map(removeEndChar)
        .filter(filterValidRow)
        .map(removePunctuation)
        .map(removeTags)
        .reduce(mergeRows)
        .split(" ")
        .map(word => word.toLowerCase());
      resolver(words);
    } catch (e) {
      reject(e);
    }
  });
};

function filterValidRow(row) {
  const notNumber = !parseInt(row.trim());
  const notEmpty = !!row.trim();
  const notInterval = !row.includes("-->");

  return notNumber && notEmpty && notInterval;
}

const removeEndChar = row => row.replace("\r", "");
const removePunctuation = row => row.replace(/[,?!.-]/g, "");
const removeTags = row => row.replace(/(<[^>]+)>/gi, "");
const mergeRows = (fullText, row) => `${fullText} ${row}`;
