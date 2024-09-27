"use client";
import React, { useState } from "react";
import { useSwitchChain } from "@starknet-react/core";
import { constants } from "starknet";
import Image from "next/image";

interface HamburgerProps {
  theme: "dark" | "light";
}

const CustomSelect: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  const [selected, setSelected] = useState("Mainnet");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { name: "Mainnet", chainId: constants.StarknetChainId.SN_MAIN },
    { name: "Sepolia", chainId: constants.StarknetChainId.SN_SEPOLIA },
  ];

  const { switchChain, error } = useSwitchChain({
    params: {
      chainId: constants.StarknetChainId.SN_SEPOLIA,
    },
  });

  const handleSelect = (option: { name: string; chainId: string }) => {
    setSelected(option.name);
    setIsOpen(false);

    switchChain({ chainId: option.chainId });
  };

  return (
    <div className="relative w-[52%] md:w-[316px]">
      <div
        className={`flex h-[50px] w-full cursor-pointer items-center justify-between rounded-xl px-4 ${
          theme === "dark"
            ? "border-[3px] border-[#494949] bg-[#2a2a2a] text-white"
            : "border-[3px] border-[#eaeaea] bg-[#f0f0f0] text-black"
        } md:font-[700]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-12 z-10 w-full rounded-xl border border-gray-500 bg-white text-black shadow-lg">
          {options.map((option) => (
            <div
              key={option.name}
              className="cursor-pointer p-2 hover:bg-gray-300"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-500">Error switching network: {error.message}</p>
      )}
    </div>
  );
};

const Hamburger: React.FC<HamburgerProps> = ({ theme }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="z-10 flex h-8 w-8 cursor-pointer flex-col justify-around border-none bg-transparent p-0 focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <div
          className={`h-1 w-8 transform rounded bg-gray-800 transition duration-300 ease-in-out ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <div
          className={`h-1 w-8 rounded bg-gray-800 transition-opacity duration-300 ease-in-out ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`h-1 w-8 transform rounded bg-gray-800 transition duration-300 ease-in-out ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className={`absolute left-0 top-10 ${
            theme === "dark" ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
          } flex h-fit w-full flex-col gap-4 rounded-3xl px-[18px] py-[16px] text-center transition-all duration-300 ease-in-out md:h-[316px] md:w-[565px] md:px-[54px] md:py-[40px] md:font-[700]`}
        >
          <div
            className={`flex items-center justify-between gap-[18px] px-1 py-3 ${
              theme === "dark"
                ? "border-b border-[#9a9a9a]"
                : "border-b border-[#9a9a9a]"
            }`}
          >
            <p
              className={`${
                theme === "dark" ? "text-[#7a7a7a]" : "text-[#7a7a7a]"
              }`}
            >
              Select Network
            </p>
            <CustomSelect theme={theme} />
          </div>

          <button
            className={`flex w-full items-center justify-center gap-2 py-4 md:h-[60px] md:py-0 md:font-[700] ${
              theme === "dark"
                ? "rounded-xl border-[1.75px] border-[#494949] bg-[#3a3a3a]"
                : "rounded-xl border border-[#9a9a9a]"
            } `}
          >
            {theme === "dark" ? (
              <Image
                src="/icons/transaction-history-white.svg"
                alt="transaction history icon"
                width={500}
                height={500}
                className="h-[15px] w-[16.66px] md:h-[30px] md:w-[30px]"
              />
            ) : (
              <Image
                src="/icons/transaction-history.svg"
                alt="transaction history icon"
                width={500}
                height={500}
                className="h-[15px] w-[16.66px] md:h-[30px] md:w-[30px]"
              />
            )}{" "}
            Transaction History
          </button>

          <button
            className={`flex w-full items-center justify-center gap-2 py-4 md:h-[60px] md:py-0 md:font-[700] ${
              theme === "dark"
                ? "rounded-xl bg-white text-black"
                : "rounded-xl bg-black text-white"
            } `}
          >
            Add Token
          </button>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
