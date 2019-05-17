function letterCount(str, char) {
  let count = 0;
  for (let letter of str) {
    if (letter === char) {
      count++;
    }
  }
  return count;
}

module.exports = letterCount;
