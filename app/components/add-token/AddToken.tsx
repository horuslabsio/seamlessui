"use client";
import { useRef, useState } from "react";
import { useConnect } from "@starknet-react/core";
import { X } from "lucide-react";
const AddTokenModal = ({ theme }: { theme: string }) => {
  const addTokenPopover = useRef<HTMLDivElement>(null);
  const { connector } = useConnect();
  const [tokenAddress, setTokenAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [name, setName] = useState("");

  function handleAddToken() {
    const fetchAddToken = async () => {
      try {
        const decimalFloat = parseFloat(decimals);
        //@ts-ignore
        const walletProvider = connector?._wallet;
        const asset = {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol,
            decimalFloat,
            name,
          },
        };

        const resp = await walletProvider.request({
          type: "wallet_watchAsset",
          params: asset,
        });
        console.log(resp);
      } catch (err) {
        console.log(err);
      } finally {
        setDecimals("");
        setName("");
        setSymbol("");
        setTokenAddress("");
      }
    };
    fetchAddToken();
  }

  return (
    <div
      popover="auto"
      id="add-token-modal"
      ref={addTokenPopover}
      className="bg-transparent py-6"
    >
      <div
        className={`relative h-fit w-[90vw] max-w-[400px] overflow-auto rounded-[12px] p-8 text-xs font-bold lg:w-[70vw] lg:max-w-[46rem] lg:rounded-[24px] lg:text-base ${theme === "light" ? "bg-base-light bg-light-linear-gradient text-blue-700" : "bg-base-dark bg-dark-linear-gradient text-grey-50"}`}
      >
        <div className="mb-8 flex justify-between">
          <h3 className="text-base font-bold lg:text-2xl">Add Token</h3>

          <button
            // @ts-ignore
            popovertarget="add-token-modal"
            popovertargetaction="hide"
          >
            <X />
          </button>
        </div>

        <form action="" className="flex flex-col items-start gap-3">
          <div className="flex w-full flex-col items-start gap-2">
            <label>Contract Address</label>
            <input
              type="text"
              placeholder="Enter Token Contract Address"
              className={`w-full rounded-[8px] border-[2px] border-solid ${theme === "light" ? "border-[#dadada] bg-[#f5f5f5]" : "border-[#494949] bg-[#3a3a3a]"} p-2 leading-[1.25rem] lg:p-3`}
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className={`w-full rounded-[8px] border-[2px] border-solid ${theme === "light" ? "border-[#dadada] bg-[#f5f5f5]" : "border-[#494949] bg-[#3a3a3a]"} p-2 leading-[1.25rem] lg:p-3`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <label>Symbol</label>
            <input
              type="text"
              placeholder="Enter Symbol"
              className={`w-full rounded-[8px] border-[2px] border-solid ${theme === "light" ? "border-[#dadada] bg-[#f5f5f5]" : "border-[#494949] bg-[#3a3a3a]"} p-2 leading-[1.25rem] lg:p-3`}
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <label>Decimals</label>
            <input
              type="text"
              placeholder="0"
              className={`mb-4 w-full rounded-[8px] border-[2px] border-solid ${theme === "light" ? "border-[#dadada] bg-[#f5f5f5]" : "border-[#494949] bg-[#3a3a3a]"} p-2 leading-[1.25rem] lg:p-3`}
              value={decimals}
              inputMode="decimal"
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setDecimals(value);
                }
              }}
            />
          </div>

          <button
            className={`w-full rounded-[12px] p-[7px] text-xs leading-[18px] disabled:cursor-not-allowed disabled:bg-opacity-80 lg:p-3 lg:text-xl lg:leading-[30px] ${theme === "light" ? "bg-blue-700 text-base-light" : "bg-grey-50 text-base-dark"} md:p-4`}
            onClick={async (e) => {
              e.preventDefault();
              handleAddToken();
            }}
            disabled={!tokenAddress}
          >
            Add Token
          </button>
        </form>
      </div>
    </div>
  );
};

const AddToken = ({ theme = "light" }: { theme: "light" | "dark" }) => {
  return (
    <>
      <div className="grid w-full place-content-center">
        <button
          aria-haspopup="dialog"
          // @ts-ignore
          popovertarget="add-token-modal"
          className={`min-w-[8rem] rounded-[8px] ${theme === "light" ? "bg-blue-700 text-base-light" : "bg-grey-50 text-base-dark"} px-4 py-2`}
        >
          Add Token
        </button>
      </div>
      <AddTokenModal theme={theme} />
    </>
  );
};

export default AddToken;
