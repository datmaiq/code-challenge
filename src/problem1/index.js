//Easy to understand the logic:.
// more code
const sum_to_n_a = function (n) {
  let sum = 0;
  let start = n > 0 ? 1 : n;
  let end = n > 0 ? n : -1;
  for (let i = start; i <= end; i++) {
    sum += i;
  }
  return sum;
};
//This is the most efficient solution in terms of time complexity.
const sum_to_n_b = function (n) {
  let absN = Math.abs(n);
  let sum = (absN * (absN + 1)) / 2;
  return n > 0 ? sum : -sum;
};
// Concise
//Risk of stack overflow for large values of n.
const sum_to_n_c = function (n) {
  if (n === 0) return 0;
  return n + sum_to_n_c(n > 0 ? n - 1 : n + 1);
};
module.exports = { sum_to_n_a, sum_to_n_b, sum_to_n_c };
