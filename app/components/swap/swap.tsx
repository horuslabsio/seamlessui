"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, useConnect } from "@starknet-react/core";

interface SwapProps {
  theme: "dark" | "light";
}

const tokenAddresses: {
  [key in "ETH" | "DAI" | "USDC" | "USDT" | "STRK"]: string;
} = {
  ETH: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  DAI: "0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3",
  USDC: "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8",
  USDT: "0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8",
  STRK: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
};
const tokenPrices: { [key in keyof typeof tokenAddresses]: number } = {
  ETH: 2435,
  DAI: 1,
  USDC: 1.01,
  USDT: 0.99,
  STRK: 0.48,
};

const CustomSelect: React.FC<{
  selectedToken: keyof typeof tokenAddresses;
  theme: string;
  onTokenSelect: (token: keyof typeof tokenAddresses) => void;
}> = ({ selectedToken, onTokenSelect, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tokens = Object.keys(tokenAddresses);

  const handleSelect = (token: string) => {
    onTokenSelect(token as keyof typeof tokenAddresses);
    setIsOpen(false);
  };

  return (
    <div className="relative h-[10.45px] w-[25%] md:h-[36px] md:w-[121px]">
      <div
        className={`${theme === "dark" ? "bg-grey-300 font-[700] text-black" : "bg-grey-800 font-[700] text-white"} flex h-full w-full cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-3 text-[10px] md:gap-4 md:rounded-md md:px-4 md:text-[16px]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedToken}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-12 z-10 w-full rounded-md bg-grey-300 text-[8.97px] text-black shadow-lg md:text-[16px]">
          {tokens.map((token) => (
            <div
              key={token}
              className="cursor-pointer p-2"
              onClick={() => handleSelect(token)}
            >
              {token}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Swap: React.FC<SwapProps> = ({ theme }) => {
  const [fromToken, setFromToken] =
    useState<keyof typeof tokenAddresses>("ETH");
  const [toToken, setToToken] = useState<keyof typeof tokenAddresses>("USDT");
  const [amount, setAmount] = useState("0");
  const [equivalent, setEquivalent] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rate, setRate] = useState(0);

  const { address } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    updateRate();
  }, [fromToken, toToken]);

  useEffect(() => {
    if (amount && rate) {
      const numericAmount = parseFloat(amount);
      if (!isNaN(numericAmount)) {
        setEquivalent((numericAmount * rate).toFixed(6));
      } else {
        setEquivalent("0");
      }
    } else {
      setEquivalent("0");
    }
  }, [amount, rate]);

  const updateRate = () => {
    const fromPrice = tokenPrices[fromToken];
    const toPrice = tokenPrices[toToken];
    const newRate = toPrice / fromPrice;
    setRate(newRate);
  };

  const numberRegex = /^[0-9]*[.,]?[0-9]*$/;

  const handleConnectWallet = async () => {
    if (connectors.length > 0) {
      try {
        await connect({ connector: connectors[0] });
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        setError("Failed to connect wallet. Please try again.");
      }
    }
  };

  const handleSwap = async () => {
    if (!address) return;

    setIsLoading(true);
    setError("");

    // Simulate a delay for the swap process
    setTimeout(() => {
      try {
        const swappedAmount = parseFloat(amount) * rate;
        console.log(
          `Swapped ${amount} ${fromToken} for ${swappedAmount.toFixed(6)} ${toToken}`
        );
        setAmount("");
        setEquivalent("0");
        setError("");
      } catch (error) {
        console.error("Swap failed:", error);
        setError("Swap failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  const handleTokenSwap = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (numberRegex.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div
      className={`mt-12 flex h-[371.67px] w-full cursor-pointer flex-col items-center gap-2 rounded-full md:h-[636px] md:w-[594px] md:gap-6 ${theme === "dark" ? "bg-light-linear-gradient" : "bg-dark-linear-gradient"} rounded-xl p-[18px] md:p-[32px]`}
    >
      <div
        className={`flex w-full items-center justify-between ${theme === "dark" ? "text-black" : "text-white"}`}
      >
        <p className="text-[15px] font-[700] md:text-[25px]">Swap</p>
        <Image
          src={theme === "dark" ? "/icons/close.svg" : "/icons/close-white.svg"}
          alt="Close"
          width={40}
          height={40}
          className="h-[20px] w-[20px] md:h-[40px] md:w-[40px]"
        />
      </div>

      <div className="relative flex w-full flex-col items-center">
        <div className="mb-4 flex w-full flex-col">
          <label
            className={`mb-2 text-[9.97px] md:text-[16px] ${theme === "dark" ? "text-black" : "text-white"}`}
          >
            From
          </label>
          <div
            className={`flex h-[78.49px] flex-col items-center rounded-[8px] px-[10px] py-[10px] md:h-[134px] md:px-[24px] md:py-[30px] ${theme === "dark" ? "border border-[#dadada] bg-[#f5f5f5]" : "border border-grey-700 bg-grey-600"}`}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  value={amount}
                  placeholder="2"
                  onChange={handleAmountChange}
                  className={`w-[45%] bg-transparent text-[18.59px] font-[700] outline-none md:w-[75%] md:text-[32px] ${theme === "dark" ? "text-black" : "text-white"}`}
                />
                <p className="ml-[2px] max-w-[45%] overflow-hidden text-ellipsis whitespace-nowrap text-[9.97px] font-[600] text-grey-500 md:text-[16px]">
                  = ${parseFloat(amount) * rate}
                </p>
              </div>
              <CustomSelect
                selectedToken={fromToken}
                onTokenSelect={setFromToken}
                theme={theme}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleTokenSwap}
          className={`absolute top-[44%] h-[46px] w-[46px] rounded-full px-[9.97px] py-0 md:h-[80px] md:w-[80px] md:px-[18px] md:py-[17px] ${theme === "dark" ? "border-[5px] border-white bg-gray-200" : "border-[5px] border-base-dark bg-grey-600"}`}
        >
          <div className="relative h-[15.95px] w-[15.95px] md:h-[32px] md:w-[32px]">
            <Image
              src={
                theme === "dark" ? "/icons/swap.svg" : "/icons/swap-white.svg"
              }
              alt="Swap"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </button>

        <div className="mt-0 flex w-full flex-col">
          <label
            className={`mb-2 text-[9.97px] md:text-[16px] ${theme === "dark" ? "text-black" : "text-white"}`}
          >
            To
          </label>
          <div
            className={`flex h-[78.49px] flex-col items-center rounded-[8px] px-[10px] py-[10px] md:h-[134px] md:px-[24px] md:py-[30px] ${theme === "dark" ? "border border-[#dadada] bg-[#f5f5f5]" : "border border-grey-700 bg-grey-600"}`}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  value={equivalent}
                  readOnly
                  className={`w-[45%] bg-transparent text-[18.59px] font-[700] outline-none md:w-[75%] md:text-[32px] ${theme === "dark" ? "text-black" : "text-white"}`}
                />
                <p className="ml-[2px] max-w-[45%] overflow-hidden text-ellipsis whitespace-nowrap text-[9.97px] font-[600] text-grey-500 md:text-[16px]">
                  = ${equivalent}
                </p>
              </div>
              <CustomSelect
                selectedToken={toToken}
                onTokenSelect={setToToken}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 md:my-2">
        <div className="flex w-full items-center justify-between">
          <p
            className={`${theme === "dark" ? "" : ""} text-[9.97px] font-[700] text-grey-500 md:text-[16px]`}
          >
            Current price
          </p>
          <p
            className={`${theme === "dark" ? "text-black" : "text-white"} text-[9.97px] font-[700] md:text-[16px]`}
          >
            1 {fromToken} = {rate.toFixed(6)} {toToken}
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p
            className={`${theme === "dark" ? "" : ""} text-[9.97px] font-[700] text-grey-500 md:text-[16px]`}
          >
            Min received
          </p>
          <p
            className={`${theme === "dark" ? "text-black" : "text-white"} text-[9.97px] font-[700] md:text-[16px]`}
          >
            {equivalent} {toToken}
          </p>
        </div>
      </div>

      {error && (
        <p className="text-[9.97px] text-red-500 md:text-[16px]">{error}</p>
      )}

      <button
        onClick={address ? handleSwap : handleConnectWallet}
        disabled={isLoading}
        className={`h-[31.94px] w-full rounded-xl py-[6.97px] text-[11.97px] font-[700] md:h-[54px] md:py-[12px] md:text-[20px] ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {isLoading ? "Processing..." : address ? "Swap" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Swap;
