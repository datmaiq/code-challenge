# Sum to N Function Analysis

This repository provides three implementations for calculating the sum of all integers from 1 to `n`. The implementations handle both positive and negative `n` values, returning the sum accordingly.

## Implementations

### `sum_to_n_a`

This implementation uses a loop to iterate through all integers from 1 to `n` (or `n` to 1 if `n` is negative) and accumulates the sum. This method is straightforward but has a time complexity of O(n).

### `sum_to_n_b`

This approach leverages the formula for the sum of the first `n` natural numbers, `n * (n + 1) / 2`. It calculates the absolute value of `n` to handle both positive and negative inputs. The result is then adjusted for negative `n` values. This method is the most efficient in terms of time complexity, O(1).

### `sum_to_n_c`

This recursive method sums integers by decrementing or incrementing `n` until it reaches zero. It is concise but can cause a stack overflow for large values of `n` due to deep recursion. The time complexity is O(n).

## Running the Tests

The repository includes a set of tests to verify the correctness of each implementation. The tests check the function outputs against expected results for various input values.

To run the tests:

1.  Ensure you have Node.js installed on your machine.
2.  Clone the repository and navigate to the project directory.
3.  Install any necessary dependencies (if applicable).
4.  Run the tests with the following command:

```bash
node index.test.js
```

## Test Cases

The test cases cover various scenarios, including:

- Positive `n` values.
- Negative `n` values.
- Edge cases like `n = 0`.

### Sample Test Case

For `n = 5`, the expected sum is `15` (1 + 2 + 3 + 4 + 5).

```javascript
const testCases = [
  { input: 5, expected: 15 },
  { input: -5, expected: -15 },
  { input: 0, expected: 0 },
  { input: 1, expected: 1 },
  { input: -1, expected: -1 },
  { input: 1000, expected: 500500 },
  { input: -1000, expected: -500500 },
];
```

## Conclusion

Each function offers a unique approach to solving the problem of summing integers from 1 to `n`. The choice of function depends on the specific requirements, such as time complexity and handling large inputs.

---

This README provides an overview of the problem, the different solutions, and instructions for running tests. It helps users understand the trade-offs between different implementations and provides clear steps to verify the correctness of the code
