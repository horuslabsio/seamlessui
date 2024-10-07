"use client";
import {
  BadgeCheck,
  ChevronDown,
  X,
  BadgeAlert,
  BadgeMinus,
  ListCheck,
  Files,
  LibraryBig,
} from "lucide-react";
import React, { useState } from "react";

interface Transaction {
  id: string;
  status: "success" | "warning" | "error";
  amount: number;
  currency: string;
  date: string;
  time: string;
  address: string;
  usdAmount: number;
}

interface TransactionProps {
  theme: "dark" | "light";
}

const TransactionList: React.FC<TransactionProps> = ({ theme }) => {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>(
    {}
  );

  const transactions: Transaction[] = [
    {
      id: "0xc662...D9C8c4",
      status: "success",
      amount: 2.874,
      currency: "ETH",
      usdAmount: 6546.54,
      date: "02-01-2024",
      time: "12PM",
      address: "0xc662...D9C8c4",
    },
    {
      id: "0xb762...C7D8b4",
      status: "error",
      amount: 1.124,
      currency: "ETH",
      usdAmount: 3546.23,
      date: "02-01-2024",
      time: "10AM",
      address: "0xb762...C7D8b4",
    },
    {
      id: "0xd823...A2F6b1",
      status: "warning",
      amount: 0.534,
      currency: "ETH",
      usdAmount: 1250.87,
      date: "02-01-2024",
      time: "8PM",
      address: "0xd823...A2F6b1",
    },
    {
      id: "0xd823...A2F6s2",
      status: "success",
      amount: 0.534,
      currency: "ETH",
      usdAmount: 1250.87,
      date: "02-01-2024",
      time: "8PM",
      address: "0xd823...A2F6b1",
    },
  ];

  const getIcon = (status: string) => {
    switch (status) {
      case "success":
        return (
          <BadgeCheck className="text-[#CDFFD2]" size={40} fill="#10a41f" />
        );
      case "warning":
        return (
          <BadgeAlert className="text-[#FFEECD]" size={40} fill="#FD9332" />
        );
      case "error":
        return (
          <BadgeMinus className="text-[#FFCDCD]" size={40} fill="#D81616" />
        );
      default:
        return null;
    }
  };

  const toggleDetails = (id: string) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="relative">
      <button
        className={`flex w-full items-center justify-center gap-2 py-4 md:h-[60px] md:py-0 md:font-[700] ${
          theme === "dark"
            ? "rounded-xl border-[1.75px] border-grey-700 bg-grey-600"
            : "rounded-xl border border-[#9a9a9a]"
        } `}
        onClick={() => setOpen(!open)}
      >
        {!open && (
          <span className="flex w-[460px] items-center justify-center">
            <LibraryBig size={30} />
            Transaction History
          </span>
        )}
      </button>

      {open && (
        <div
          className={`${theme === "dark" ? "bg-dark-linear-gradient" : "bg-light-linear-gradient"} absolute left-0 top-0 mx-auto flex h-fit w-[632px] flex-col items-center rounded-xl px-[40px] py-[32px]`}
        >
          <div className="mb-8 flex w-full flex-row items-center justify-between">
            <h1
              className={`${theme === "dark" ? "text-white" : "text-black"} text-[24px] font-[700]`}
            >
              Transaction List
            </h1>
            <X
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
              size={30}
              onClick={() => setOpen(!open)}
            />
          </div>

          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`transition-all duration-300 ease-in-out ${
                showDetails[transaction.id]
                  ? "max-h-fit justify-start"
                  : "max-h-[144px]"
              } overflow-hidden ${theme === "dark" ? "border-[#2A2A2A] bg-base-dark" : "border-[#F5F5F5] bg-base-light"} mb-4 flex w-[552px] flex-col items-center justify-start gap-[24px] rounded-[24px] border px-[17px] py-[24px]`}
            >
              <div className="relative flex flex-shrink-0 items-center justify-start gap-[24px]">
                <div
                  className={`flex h-[76px] w-[76px] flex-col items-center justify-center justify-self-start rounded-[26px] ${
                    transaction.status === "success"
                      ? "bg-[#CDFFD2]"
                      : transaction.status === "warning"
                        ? "bg-yellow-100"
                        : "bg-red-100"
                  }`}
                >
                  {getIcon(transaction.status)}
                </div>

                <div className="flex h-fit w-[419px] flex-col gap-2">
                  <div className="flex justify-between border-b-[1.75px] border-grey-300 px-[2px] py-[12px]">
                    <div
                      className={`flex h-[48px] w-[209px] items-center gap-[16px] rounded-3xl border px-[16px] py-[12px] ${
                        theme === "dark"
                          ? "border-grey-700 bg-grey-700"
                          : "border-grey-300 bg-[#f5f5f5]"
                      }`}
                    >
                      <div className="h-[24px] w-[24px] rounded-full bg-purple-900"></div>
                      <p className="text-[16px] font-[700] text-[#FD9332]">
                        {transaction.address}
                      </p>
                    </div>
                    <div>
                      <p className="flex gap-1 text-[16px] font-[700] text-[#10A41F]">
                        +{transaction.amount}{" "}
                        <span className="self-end text-[12px]">
                          {transaction.currency}
                        </span>
                      </p>
                      <p className="flex gap-1 text-[12px] font-[700] text-grey-500">
                        ${transaction.usdAmount.toFixed(2)} USD
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <p
                          className={`${
                            theme === "dark"
                              ? "bg-[#2A2A2A] text-[#9A9A9A]"
                              : "bg-[#F5F5F5] text-grey-500"
                          } rounded-sm px-[8px] py-[3px] text-[12px] font-[700]`}
                        >
                          {transaction.date}
                        </p>
                        <p
                          className={`${
                            theme === "dark"
                              ? "bg-[#2A2A2A] text-[#9A9A9A]"
                              : "bg-[#F5F5F5] text-grey-500"
                          } rounded-sm px-[8px] py-[3px] text-[12px] font-[700]`}
                        >
                          {transaction.time}
                        </p>
                      </div>

                      <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={() => toggleDetails(transaction.id)}
                      >
                        <p
                          className={`${theme === "dark" ? "text-[#9A9A9A]" : "text-grey-500"} text-[12px] font-[700]`}
                        >
                          TRANSACTION ID
                        </p>
                        <ChevronDown
                          className={`${
                            theme === "dark"
                              ? "text-grey-300"
                              : "text-[#141925]"
                          } transform ${showDetails[transaction.id] ? "rotate-180" : ""}`}
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showDetails[transaction.id] && (
                <div
                  className={`flex h-[244px] w-[419px] items-start justify-start gap-[25px] rounded-[12px] px-[14px] py-[32px] text-start ${theme === "dark" ? "bg-[#48433D]" : "bg-[#FFEBDA]"} self-end`}
                >
                  <ListCheck className="text-grey-500" size={20} />

                  <div className="flex flex-col gap-[15px]">
                    <p className="text-[12px] font-[700] text-grey-500">
                      Fee 0.00024158 ETH ($0.92)
                    </p>
                    <div>
                      <p className="text-[16px] font-[700] text-grey-500">
                        Transaction hash
                      </p>
                      <h2 className="text-[#FD9332]">
                        0xc662c410C0ECf747543f5bA90660f6
                      </h2>
                    </div>
                    <div>
                      <p className="text-[16px] font-[700] text-grey-500">
                        Wallet Address Recipient
                      </p>
                      <div className="flex items-center gap-4">
                        <h2 className="text-[#FD9332]">
                          0xc662c410C0ECf747543f5bA90660f6
                        </h2>
                        <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white">
                          <Files size={20} className="text-[#FF7300]" />
                        </div>
                      </div>
                    </div>

                    <p
                      className={`underline ${theme === "dark" ? "text-white" : "text-black"}`}
                    >
                      See transactions
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
