function createRandomPermutation(n) {
  const indexes = new Array(n).fill(null).map((_, i) => i);
  const permutation = [];
  for (let j = 0; j < n; j++) {
    const randomIndex = Math.floor(Math.random() * indexes.length);
    const randomValue = indexes[randomIndex];
    if (randomValue === j) {
      j--;
      continue;
    }
    permutation.push(randomValue);
    indexes.splice(randomIndex, 1);
  }
  return permutation;
}

module.exports = createRandomPermutation;
