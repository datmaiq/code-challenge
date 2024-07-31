import { useState, useEffect } from "react";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

// Custom hook to fetch wallet balances
const useWalletBalances = () => {
  const [balances, setBalances] = useState<WalletBalance[]>([]);

  useEffect(() => {
    const fetchBalances = () => {
      // Mocked data with fixed amounts and assigned blockchains
      const data: WalletBalance[] = [
        { currency: "ETH", amount: 10.12223, blockchain: "Ethereum" }, // Fixed amount for ETH
        { currency: "ATOM", amount: 25.10892, blockchain: "Osmosis" }, // Fixed amount for ATOM
        { currency: "DOT", amount: 40.34891, blockchain: "Ethereum" }, // Fixed amount for DOT
        { currency: "ADA", amount: 100.21156, blockchain: "Ethereum" }, // Fixed amount for ADA
      ];

      setBalances(data);
    };

    fetchBalances();
  }, []);

  return balances;
};

export default useWalletBalances;
