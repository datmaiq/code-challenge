import React, { useMemo } from "react";
import useWalletBalances from "./hooks/useWalletBalances";
import usePrices from "./hooks/usePrices";
import WalletRow from "./components/WalletRow";
import styled from "styled-components";
import myImage from "./assets/background/bg.jpg";
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

const ScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${myImage});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WalletContainer = styled.div`
  width: 90%;
  max-width: 600px;
  height: auto;
  padding: 2rem;
  background: #efeaf4;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 30px;

  @media (max-width: 768px) {
    width: 80%;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(
    90deg,
    #f90cff,
    #6560ff 23%,
    #0cd7e8 76%,
    #f90cff
  );
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-animation 3s linear infinite;

  @keyframes gradient-animation {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const { prices } = usePrices();

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
      formatted: balance.amount.toFixed(5),
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
    <ScreenContainer>
      <WalletContainer {...rest}>
        <Title>Wallet 99Tech</Title>
        {rows}
      </WalletContainer>
    </ScreenContainer>
  );
};

export default WalletPage;
