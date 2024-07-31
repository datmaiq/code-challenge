### Issues and Improvements

#### 1\. Priority Calculation

**Issue:** The `getPriority` function used a switch-case statement to return priority values for different blockchains. This approach was verbose and less maintainable.

**Improvement:** Replaced the switch-case with a map lookup, making the function more concise and easier to update if new blockchains need to be added.

```bash
const getPriority = (blockchain: string): number => {
const priorities: { [key: string]: number } = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};
return priorities[blockchain] ?? -99;
};
```

#### 2\. Dependency Management in `useMemo`

**Issue:** The `useMemo` hook had `prices` as a dependency even though `prices` was not used within the memoized function. This could cause unnecessary re-renders.

**Improvement:** Removed `prices` from the dependencies of `useMemo`.

tsx

```bash
const sortedBalances = useMemo(() => {
return balances
  .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
  .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
}, [balances]);
```

#### 3\. Formatting Logic

**Issue:** The formatted balances were not memoized, potentially causing unnecessary recalculations and re-renders.

**Improvement:** Added a `useMemo` hook to memoize the formatted balances.

```bash
`const formattedBalances = useMemo(() => {
 return sortedBalances.map((balance: WalletBalance) => ({
   ...balance,
   formatted: balance.amount.toFixed(2),
 }));
}, [sortedBalances]);`
}, [balances]);
```

#### 4\. Key Prop Handling

**Issue:** The key prop in the map function used the index of the array, which can lead to issues with React's reconciliation process if the list changes.

**Improvement:** Improved the `key` prop by combining `blockchain` and `currency` to ensure uniqueness.

````bash
const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
  const usdValue = prices[balance.currency] * balance.amount;
  return (
    <WalletRow
      key={`${balance.blockchain}-${balance.currency}`}
      amount={balance.amount}
      usdValue={usdValue}
      formattedAmount={balance.formatted}
    />
  );
});
```bash
````
