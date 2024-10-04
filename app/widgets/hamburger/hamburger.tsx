"use client";
import React, { useState } from "react";
import { useSwitchChain } from "@starknet-react/core";
import { Check, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import TransactionList from "../transaction-history/transaction-history";

interface HamburgerProps {
  theme: "dark" | "light";
}

const STARKNET_CHAINID = {
  SN_MAIN: "0x534e5f4d41494e", // Mainnet
  SN_SEPOLIA: "0x534e5f5345504f4c4941", // Sepolia testnet
};

const CustomSelect: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  const [selected, setSelected] = useState("Mainnet");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { name: "Mainnet", chainId: STARKNET_CHAINID.SN_MAIN },
    { name: "Sepolia", chainId: STARKNET_CHAINID.SN_SEPOLIA },
  ];

  const { switchChain, error } = useSwitchChain({
    params: {
      chainId: STARKNET_CHAINID.SN_SEPOLIA,
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
            ? "border-[3px] border-grey-700 bg-[#2a2a2a] text-white"
            : "border-[3px] border-[#eaeaea] bg-[#f0f0f0] text-black"
        } md:font-[700]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </div>

      {isOpen && (
        <div
          className={`absolute left-0 top-0 z-10 w-full rounded-xl border-[3px] ${theme === "dark" ? "border-grey-800 bg-base-dark text-white" : "border-[#eaeaea] bg-[#f0f0f0] text-black"} px-4 py-2 shadow-lg`}
        >
          <div
            className={`flex h-[50px] w-full cursor-pointer items-center justify-between px-4 ${
              theme === "dark"
                ? "border-gray-500 text-white"
                : "border-grey-300 text-black"
            } border-b-[3px] md:font-[700]`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selected}</span>
            <span>
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </div>
          {options.map((option) => (
            <div
              key={option.name}
              className={`mt-2 flex cursor-pointer items-center gap-2 rounded-md p-2 ${
                selected === option.name
                  ? theme === "dark"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                  : theme === "dark"
                    ? "text-white hover:bg-grey-800"
                    : "text-black hover:bg-grey-300"
              } `}
              onClick={() => handleSelect(option)}
            >
              {selected === option.name && (
                <Check
                  size={20}
                  className={`${theme === "dark" ? "text-grey-300" : "text-grey-800"}`}
                />
              )}
              {option.name}
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-600">Error switching network: {error.message}</p>
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
        {open ? (
          <X className="h-8 w-8 text-gray-800 transition duration-300 ease-in-out" />
        ) : (
          <Menu className="h-8 w-8 text-gray-800 transition duration-300 ease-in-out" />
        )}
      </button>

      {open && (
        <div
          className={`absolute left-0 top-10 ${
            theme === "dark"
              ? "bg-base-dark text-white"
              : "bg-base-light text-black"
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
                theme === "dark" ? "text-grey-500" : "text-grey-500"
              }`}
            >
              Select Network
            </p>
            <CustomSelect theme={theme} />
          </div>

          <TransactionList theme={theme} />
          <button
            className={`flex w-full items-center justify-center gap-2 py-4 md:h-[60px] md:py-0 md:font-[700] ${
              theme === "dark"
                ? "rounded-xl bg-base-light text-black"
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
