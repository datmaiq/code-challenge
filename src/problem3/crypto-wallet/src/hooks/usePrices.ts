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
          ETH: 3212.12789,
          ATOM: 10.2115,
          DOT: 5.47812,
          ADA: 10.11112,
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
