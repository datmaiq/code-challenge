import React, { useState, useEffect } from "react";
import axios from "axios";
import loadTokenImages from "./loadTokenImages";
import TokenModal from "./components/TokenModal";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification"; // Import Notification component

const App = () => {
  const [prices, setPrices] = useState({});
  const [fromToken, setFromToken] = useState("eth");
  const [toToken, setToToken] = useState("usd");
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);
  const [tokenImages, setTokenImages] = useState({});
  const [isFromTokenModalOpen, setIsFromTokenModalOpen] = useState(false);
  const [isToTokenModalOpen, setIsToTokenModalOpen] = useState(false);
  const [recentSwap, setRecentSwap] = useState({ token: "USD", amount: 0 });
  const [isSwapping, setIsSwapping] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "https://interview.switcheo.com/prices.json"
        );
        const pricesData = response.data.reduce((acc, token) => {
          if (token.price > 0) {
            acc[token.currency.toLowerCase()] = token.price;
          }
          return acc;
        }, {});
        setPrices(pricesData);

        const validTokens = response.data
          .filter((token) => token.price > 0)
          .map((token) => token.currency.toLowerCase());
        const images = loadTokenImages(validTokens);
        setTokenImages(images);
      } catch (error) {
        setNotificationMessage("Failed to fetch token prices.");
        setTimeout(() => setNotificationMessage(""), 3000); // Hide message after 3 seconds
      }
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    if (prices[fromToken] && prices[toToken]) {
      setToAmount(
        Number(((fromAmount * prices[fromToken]) / prices[toToken]).toFixed(5))
      );
    }
  }, [prices, fromToken, toToken, fromAmount]);

  const updateToAmount = (fromAmount) => {
    if (prices[fromToken] && prices[toToken]) {
      setToAmount(
        Number(((fromAmount * prices[fromToken]) / prices[toToken]).toFixed(8))
      );
    }
  };

  const updateFromAmount = (toAmount) => {
    if (prices[fromToken] && prices[toToken]) {
      setFromAmount(
        Number(((toAmount * prices[toToken]) / prices[fromToken]).toFixed(8))
      );
    }
  };

  const handleFromAmountChange = (e) => {
    let value = e.target.value.replace(/^0+(?=\d)/, "");
    value = parseFloat(value) || 0;
    if (value < 0) return;
    setFromAmount(value);
    updateToAmount(value);
  };

  const handleToAmountChange = (e) => {
    let value = e.target.value.replace(/^0+(?=\d)/, "");
    value = parseFloat(value) || 0;
    if (value < 0) return;
    setToAmount(value);
    updateFromAmount(value);
  };

  const handleFromTokenChange = (token) => {
    setFromToken(token);
    setIsFromTokenModalOpen(false);
  };

  const handleToTokenChange = (token) => {
    setToToken(token);
    setIsToTokenModalOpen(false);
  };

  const handleSwap = () => {
    if (prices[fromToken] && prices[toToken]) {
      setIsSwapping(true);

      setTimeout(() => {
        setRecentSwap({ token: toToken, amount: toAmount });
        setIsSwapping(false);
        setNotificationMessage("Swap successful!");
        setTimeout(() => setNotificationMessage(""), 3000); // Hide message after 3 seconds
      }, 1000);
    } else {
      setNotificationMessage("Invalid token prices for swap.");
      setTimeout(() => setNotificationMessage(""), 3000); // Hide message after 3 seconds
    }
  };

  const getTokenImage = (symbol) => {
    return tokenImages[symbol.toLowerCase()] || "";
  };

  const isSwapDisabled = !prices[fromToken] || !prices[toToken] || isSwapping;

  return (
    <div className="min-h-screen bg-99-bg bg-cover bg-center">
      <Navbar recentSwap={recentSwap} getTokenImage={getTokenImage} />

      <div className="h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-1/4 mx-auto py-5 rounded-2xl shadow-lg bg-white mt-6">
          <h3 className="text-purple-500 font-kanit px-5 font-extrabold leading-6 text-xl text-start">
            99Tech Swap
          </h3>
          <h5 className="text-gray-500 font-kanit pb-5 mt-1 mb-5 px-5 font-bold leading-6 text-sm text-start border-b-2">
            Be part of the future of marketing
          </h5>
          <div className="flex flex-col space-y-4 px-5">
            <div className="flex flex-col items-start">
              <button
                onClick={() => setIsFromTokenModalOpen(true)}
                className="p-2 rounded mb-2 flex-grow"
              >
                <img
                  src={getTokenImage(fromToken)}
                  alt={fromToken}
                  className="w-6 h-6 mr-2 inline-block"
                />
                {fromToken.toUpperCase()}
              </button>
              <input
                type="text"
                value={fromAmount}
                onChange={handleFromAmountChange}
                className="p-2 bg-pink-bg h-20 border rounded-2xl flex-grow w-full text-end"
              />
            </div>
            <div className="flex flex-col items-start">
              <button
                onClick={() => setIsToTokenModalOpen(true)}
                className="p-2 rounded mb-2 flex-grow"
              >
                <img
                  src={getTokenImage(toToken)}
                  alt={toToken}
                  className="w-6 h-6 mr-2 inline-block"
                />
                {toToken.toUpperCase()}
              </button>
              <input
                type="text"
                value={toAmount}
                onChange={handleToAmountChange}
                className="p-2 bg-pink-bg h-20 border rounded-2xl flex-grow w-full text-end"
              />
            </div>
            <div className="text-center mt-4">
              <button
                onClick={handleSwap}
                className="px-8 w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
                disabled={isSwapDisabled}
              >
                {isSwapping ? "Swapping..." : "Swap Token"}
              </button>
            </div>
          </div>
          <TokenModal
            isOpen={isFromTokenModalOpen}
            onClose={() => setIsFromTokenModalOpen(false)}
            onSelectToken={handleFromTokenChange}
            tokenImages={tokenImages}
            prices={prices}
          />
          <TokenModal
            isOpen={isToTokenModalOpen}
            onClose={() => setIsToTokenModalOpen(false)}
            onSelectToken={handleToTokenChange}
            tokenImages={tokenImages}
            prices={prices}
          />
        </div>
        <Notification
          message={notificationMessage}
          onClose={() => setNotificationMessage("")}
        />
      </div>
    </div>
  );
};

export default App;
