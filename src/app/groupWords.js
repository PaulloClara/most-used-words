const pipe = require("pipe-to");

// Input: ['you', 'i', 'he', 'i']
// Output: [{you: 1}, {i: 2}, {he: 1}]
function groupWords(words) {
  return words.reduce((obj, word) => {
    if (obj[word]) obj[word] += 1;
    else obj[word] = 1;

    return obj;
  }, {});
}

// Input: [{you: 1}, {i: 2}, {he: 1}]
// Output: [{name:'you',amount: 1}, {name:'i',amount: 2}, {name:'he',amount: 1}]
function formatGroupedWords(groupedWords) {
  return Object.keys(groupedWords).map(key => ({
    name: key,
    amount: groupedWords[key]
  }));
}

// Input: [{name:'you',amount: 1}, {name:'i',amount: 2}, {name:'he',amount: 1}]
// Output: [{name:'i',amount: 2}, {name:'you',amount: 1}, {name:'he',amount: 1}]
function sortGroupedWords(groupedWords) {
  return groupedWords.sort((word1, word2) => word2.amount - word1.amount);
}

module.exports = function(words) {
  return new Promise((resolver, reject) => {
    try {
      const groupedWords = pipe(words).to(
        groupWords,
        formatGroupedWords,
        sortGroupedWords
      );

      resolver(groupedWords);
    } catch (error) {
      reject(error);
    }
  });
};
