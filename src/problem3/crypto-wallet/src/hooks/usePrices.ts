import { useState, useEffect } from "react";

// Custom hook to fetch currency prices
const usePrices = () => {
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = () => {
      try {
        // Mocked price data for each currency
        const mockedPrices: { [key: string]: number } = {
          BTC: 27000, // Example price for Bitcoin in USD
          ETH: 1700, // Example price for Ethereum in USD
          ATOM: 10, // Example price for Cosmos in USD
          DOT: 6, // Example price for Polkadot in USD
          ADA: 0.5, // Example price for Cardano in USD
        };

        setPrices(mockedPrices);
      } catch (error) {
        setError("An error occurred while setting mocked prices");
      }
    };

    fetchPrices();
  }, []);

  return { prices, error };
};

export default usePrices;
