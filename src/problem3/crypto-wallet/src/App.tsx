import React, { useMemo } from "react";
import useWalletBalances from "./hooks/useWalletBalances";
import usePrices from "./hooks/usePrices";
import WalletRow from "./components/WalletRow";
import styled from "styled-components";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends React.HTMLProps<HTMLDivElement> {}

// Using styled-components for styling
const WalletContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances(); // Fetching wallet balances
  const { prices } = usePrices(); // Fetching currency prices

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

  // Removed prices from dependencies and simplified sorting logic
  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          getPriority(balance.blockchain) > -99 && balance.amount > 0
      )
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));
  }, [balances]);

  // Memoized formatted balances
  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2),
    }));
  }, [sortedBalances]);

  // Improved key handling in the map function
  const rows = formattedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        key={`${balance.blockchain}-${balance.currency}`} // Improved key handling
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
        currency={balance.currency}
        blockchain={balance.blockchain}
        price={prices[balance.currency]}
      />
    );
  });

  return (
    <WalletContainer {...rest}>
      <Title>Wallet Balances</Title>
      {rows}
    </WalletContainer>
  );
};

export default WalletPage;
