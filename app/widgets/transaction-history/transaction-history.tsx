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
import React, { useRef, useState } from "react";

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
  full: boolean;
}

const TransactionList: React.FC<TransactionProps> = ({
  theme,
  // width = "full",
  full,
}) => {
  const txnHistoryPopover = useRef<HTMLDialogElement>(null);
  const [showDetails, setShowDetails] = useState<string>("");

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

  return (
    <div className="relative">
      <button
        onClick={() => txnHistoryPopover.current?.showModal()}
        aria-haspopup="menu"
        className={`flex w-full ${full ? "" : "min-w-[8rem]"} cursor-pointer items-center justify-center gap-1 rounded-xl border px-4 py-[14px] font-medium focus:outline-none ${
          theme === "dark"
            ? "border-[#494949] bg-[#3A3A3A] text-[#fafafa]"
            : "border-[#9a9a9a] bg-[#FAFAFA] text-[#141925]"
        } `}
      >
        <LibraryBig size={20} />
        Transaction History
      </button>
      <dialog
        ref={txnHistoryPopover}
        className="overflow-hidden rounded-[12px] bg-transparent lg:rounded-[24px]"
      >
        <div
          style={{
            background:
              theme === "light"
                ? "linear-gradient(168.54deg, #FF9034 -46.81%, #FFFFFF 31.09%, #FFFFFF 77.47%)"
                : "linear-gradient(169.58deg, #E1852D -79.18%, #212121 19.19%, #1A1A1A 56.31%)",
          }}
          className="relative flex w-fit flex-col items-center rounded-xl p-4 md:p-[2rem]"
        >
          <div
            className={`mb-8 flex w-full items-center justify-between ${theme === "dark" ? "text-[#FAFAFA]" : "text-[#141925]"}`}
          >
            <h1 className="text-xl font-[700] md:text-2xl">Transaction List</h1>
            <X
              size={24}
              onClick={() => {
                setShowDetails("");
                txnHistoryPopover.current?.close();
              }}
            />
          </div>
          <div className="flex max-h-[600px] flex-col gap-4 overflow-y-auto">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`h-fit w-[500px] transition-all duration-500 ease-in-out ${theme === "dark" ? "border-[#2A2A2A] bg-[#1A1A1A]" : "border-[#F5F5F5] bg-white"} items-center gap-[24px] rounded-[24px] border px-[16px] py-[24px]`}
              >
                <div className="mb-0 grid grid-cols-[auto_1fr] items-center gap-x-6">
                  <div
                    className={`flex items-center justify-center rounded-[24px] p-4 ${
                      transaction.status === "success"
                        ? "bg-[#CDFFD2]"
                        : transaction.status === "warning"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                    }`}
                  >
                    {getIcon(transaction.status)}
                  </div>

                  <div className="flex h-fit flex-col gap-2">
                    <div className="flex items-center justify-between border-b-[1.75px] border-[#DADADA] pb-3">
                      <div
                        className={`flex w-fit items-center gap-3 rounded-full border px-4 py-2 text-xs ${
                          theme === "dark"
                            ? "border-[#494949] bg-[#494949]"
                            : "border-[#DADADA] bg-[#f5f5f5]"
                        }`}
                      >
                        <div className="h-[20px] w-[20px] rounded-full bg-purple-900"></div>
                        <p className="font-[600] text-[#FD9332]">
                          {transaction.address}
                        </p>
                      </div>
                      <div>
                        <p className="flex gap-1 text-sm font-[700] text-[#10A41F]">
                          +{transaction.amount}{" "}
                          <span className="self-end text-[12px]">
                            {transaction.currency}
                          </span>
                        </p>
                        <p className="flex gap-1 text-[12px] font-[700] text-[#7A7A7A]">
                          ${transaction.usdAmount.toFixed(2)} USD
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <p
                          className={`${
                            theme === "dark"
                              ? "bg-[#2A2A2A] text-[#9A9A9A]"
                              : "bg-[#F5F5F5] text-[#7A7A7A]"
                          } rounded-sm px-[8px] py-[3px] text-[12px] font-[700] leading-[18px]`}
                        >
                          {transaction.date}
                        </p>
                        <p
                          className={`${
                            theme === "dark"
                              ? "bg-[#2A2A2A] text-[#9A9A9A]"
                              : "bg-[#F5F5F5] text-[#7A7A7A]"
                          } rounded-sm px-[8px] py-[3px] text-[12px] font-[700] leading-[18px]`}
                        >
                          {transaction.time}
                        </p>
                      </div>

                      <div
                        className="flex cursor-pointer items-center gap-1"
                        onClick={() => {
                          if (showDetails === transaction.id) {
                            setShowDetails("");
                            return;
                          }

                          setShowDetails(transaction.id);
                        }}
                      >
                        <p
                          className={`${theme === "dark" ? "text-[#9A9A9A]" : "text-[#7A7A7A]"} text-[11px] font-[700]`}
                        >
                          TRANSACTION ID
                        </p>
                        <ChevronDown
                          className={`${
                            theme === "dark"
                              ? "text-[#DADADA]"
                              : "text-[#141925]"
                          } transform ${showDetails === transaction.id ? "rotate-180" : ""}`}
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`grid justify-end overflow-hidden transition-all duration-500 ${
                    showDetails === transaction.id
                      ? "max-h-[500px] grid-rows-[auto]"
                      : "max-h-0 grid-rows-[0fr]"
                  }`}
                >
                  <div
                    className={`mt-4 flex w-[350px] items-start justify-start gap-[25px] overflow-hidden rounded-[12px] px-[14px] py-[24px] text-start ease-in-out ${
                      theme === "dark" ? "bg-[#48433D]" : "bg-[#FFEBDA]"
                    } self-end`}
                  >
                    <ListCheck className="text-[#7A7A7A]" size={20} />

                    <div className="flex flex-col gap-[15px] text-[16px]">
                      <p className="text-[12px] font-[700] text-[#7A7A7A]">
                        Fee 0.00024158 ETH ($0.92)
                      </p>
                      <div>
                        <p className="text-sm font-[700] text-[#7A7A7A]">
                          Transaction hash
                        </p>
                        <div className="flex items-center gap-4">
                          <h2 className="text-[#FD9332]">
                            0xc6621b234...3460f6
                          </h2>
                          <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white">
                            <Files size={20} className="text-[#FF7300]" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-[700] text-[#7A7A7A]">
                          Wallet Address Recipient
                        </p>
                        <div className="flex items-center gap-4">
                          <h2 className="text-[#FD9332]">
                            0xc6621b234...3460f6
                          </h2>
                          <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white">
                            <Files size={20} className="text-[#FF7300]" />
                          </div>
                        </div>
                      </div>

                      <p
                        className={`underline ${theme === "dark" ? "text-[#FAFAFA]" : "text-[#141925]"}`}
                      >
                        See transactions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TransactionList;
