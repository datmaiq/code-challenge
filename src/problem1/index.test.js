const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require("./index");

const testCases = [
  { input: 5, expected: 15 },
  { input: -5, expected: -15 },
  { input: 0, expected: 0 },
  { input: 1, expected: 1 },
  { input: -1, expected: -1 },
  { input: 1000, expected: 500500 },
  { input: -1000, expected: -500500 },
];

function runTests() {
  console.log("Running tests for sum_to_n_a");
  console.time("sum_to_n_a tests");
  testCases.forEach(({ input, expected }) => {
    const result = sum_to_n_a(input);
    console.assert(
      result === expected,
      `Test failed for sum_to_n_a(${input}): expected ${expected}, got ${result}`
    );
  });
  console.timeEnd("sum_to_n_a tests");

  console.log("Running tests for sum_to_n_b");
  console.time("sum_to_n_b tests");
  testCases.forEach(({ input, expected }) => {
    const result = sum_to_n_b(input);
    console.assert(
      result === expected,
      `Test failed for sum_to_n_b(${input}): expected ${expected}, got ${result}`
    );
  });
  console.timeEnd("sum_to_n_b tests");

  console.log("Running tests for sum_to_n_c");
  console.time("sum_to_n_c tests");
  testCases.forEach(({ input, expected }) => {
    const result = sum_to_n_c(input);
    console.assert(
      result === expected,
      `Test failed for sum_to_n_c(${input}): expected ${expected}, got ${result}`
    );
  });
  console.timeEnd("sum_to_n_c tests");

  console.log("All tests completed.");
}

runTests();
