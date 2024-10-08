import { ThemeProps } from "@/types";

export const addTokenCodeGen = ({
  full,
  theme,
}: {
  theme?: ThemeProps;
  full?: boolean;
}) => `
"use client";
import { useRef, useState } from "react";
import { useConnect } from "@starknet-react/core";
import { X } from "lucide-react";

const AddToken = () => {
  const addTokenPopover = useRef<HTMLDialogElement>(null);
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
    <>
      ${
        full
          ? `
        <button
          onClick={() => addTokenPopover.current?.showModal()}
          aria-haspopup="menu"
          className="w-full min-w-[8rem] rounded-[8px] bg-[#141925] px-4 py-2 text-[#fafafa]"
        >
          Add token
        </button>
          `
          : `
        <div className="grid h-full w-full place-content-center">
          <button
            onClick={() => addTokenPopover.current?.showModal()}
            aria-haspopup="menu"
            className="min-w-[8rem] rounded-[8px] bg-[#141925] px-4 py-2 text-[#fafafa]"
          >
            Add token
          </button>
        </div>
      `
      }

      <dialog
        ref={addTokenPopover}
        className="mx-auto my-auto bg-transparent"
      >
        <div
          style={{
            background:
              ${
                theme === "light"
                  ? '"linear-gradient(168.54deg, #FF9034 -46.81%, #FFFFFF 31.09%, #FFFFFF 77.47%)"'
                  : '"linear-gradient(169.58deg, #E1852D -79.18%, #212121 19.19%, #1A1A1A 56.31%)"'
              },
          }}
          className="relative w-[90vw] max-w-[390px] rounded-[24px] p-4 md:p-8 lg:w-[35rem] lg:max-w-none ${theme === "light" ? "bg-white text-[#141925]" : "bg-[#1A1A1A] text-[#fafafa]"}"
        >
          <div className="mb-8 flex justify-between">
            <h3 className="text-base font-bold lg:text-2xl">Add Token</h3>

            <button
              onClick={() => {
                addTokenPopover.current?.close();
              }}
              className="w-fit rounded-full p-1 ${theme === "light" ? "" : "bg-[#343434]"}"
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
                className="w-full rounded-[8px] border-[2px] border-solid ${theme === "light" ? "border-[#dadada] bg-[#f5f5f5]" : "border-[#494949] bg-[#3a3a3a]"} p-2 leading-[1.25rem] lg:p-3"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full rounded-[8px] border-[2px] border-solid ${theme === "light" ? "border-[#dadada] bg-[#f5f5f5]" : "border-[#494949] bg-[#3a3a3a]"} p-2 leading-[1.25rem] lg:p-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <label>Symbol</label>
              <input
                type="text"
                placeholder="Enter Symbol"
                className="w-full rounded-[8px] border-[2px] border-solid ${theme === "light" ? "border-[#dadada] bg-[#f5f5f5]" : "border-[#494949] bg-[#3a3a3a]"} p-2 leading-[1.25rem] lg:p-3"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <label>Decimals</label>
              <input
                type="text"
                placeholder="0"
                className="mb-4 w-full rounded-[8px] border-[2px] border-solid ${theme === "light" ? "border-[#dadada] bg-[#f5f5f5]" : "border-[#494949] bg-[#3a3a3a]"} p-2 leading-[1.25rem] lg:p-3"
                value={decimals}
                inputMode="decimal"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\\d*\\.?\\d*$/.test(value)) {
                    setDecimals(value);
                  }
                }}
              />
            </div>

            <button
              className="w-full rounded-[12px] p-3 disabled:cursor-not-allowed disabled:bg-opacity-80 ${theme === "light" ? "bg-[#141925] text-white" : "bg-[#fafafa] text-[#1A1A1A]"}"
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
      </dialog>
    </>
  );
};

export default AddToken;
`;
