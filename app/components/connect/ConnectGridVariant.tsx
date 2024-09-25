"use client";

import { useConnect, useAccount, useDisconnect } from "@starknet-react/core";
import { ReactNode, useEffect, useRef } from "react";
import { Mail, X } from "lucide-react";

export default function ConnectGridVariant() {
  const connectPopover = useRef<HTMLDivElement>(null);
  const { connect, connectors, status: connectStatus } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  useEffect(() => {
    if (connectStatus === "error" || connectStatus === "success") {
      //@ts-ignore
      connectPopover.current?.hidePopover();
    }
  }, [connectStatus]);

  // Helper function to shorten the address
  const shortenAddress = (address: string) => {
    return address
      ? `${address.slice(0, 6)}...${address.slice(address.length - 3)}`
      : "";
  };

  return (
    <div className="mx-auto mt-[5rem] flex w-[70vw] max-w-[46rem] justify-end">
      <button
        onClick={(e) => {
          if (address) {
            disconnect();
          } else {
            //@ts-ignore
            connectPopover.current.showPopover();
          }
        }}
        aria-haspopup="menu"
        className="min-w-[8rem] rounded-[8px] bg-blue-700 px-4 py-2"
      >
        {address ? shortenAddress(address) : "connect"}
      </button>

      <div
        popover="auto"
        id="connect-modal"
        ref={connectPopover}
        className="bg-transparent"
      >
        <div className="relative h-[90vh] max-h-[390px] w-[90vw] max-w-[500px] overflow-scroll rounded-[24px] bg-base-light bg-light-linear-gradient p-8 text-base text-blue-700 lg:grid lg:h-[30rem] lg:max-h-[480px] lg:w-[70vw] lg:max-w-[46rem] lg:grid-cols-2">
          {connectStatus === "pending" && (
            <div
              role="alert"
              className="absolute left-0 top-0 z-10 grid h-full w-full place-content-center rounded-[24px] bg-[#ffffff81]"
            >
              <span
                className="mx-auto inline-block h-[38px] w-[38px] animate-spin rounded-full border-2 border-blue-700 border-b-transparent"
                aria-label="Loading"
              ></span>
            </div>
          )}
          <div>
            <div className="mb-4 flex justify-between">
              <h3 className="text-xl font-bold lg:mb-8">Connect Wallet</h3>

              <button
                //@ts-ignore
                popovertarget="connect-modal"
                className="w-fit lg:hidden"
              >
                <X />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div>
              <h4 className="mb-8 font-bold">Popular</h4>
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <ConnectButton
                    name={connectors[0].name}
                    func={() => connect({ connector: connectors[0] })}
                  >
                    <img
                      src={
                        "https://res.cloudinary.com/dc3gdzgel/image/upload/v1727178076/seamlessui/j9udld3y5kzm0kejaywe.png"
                      }
                      alt=""
                    />
                  </ConnectButton>

                  <ConnectButton
                    name={connectors[1].name}
                    func={() => connect({ connector: connectors[1] })}
                  >
                    <img
                      src={
                        "https://res.cloudinary.com/dc3gdzgel/image/upload/v1727178076/seamlessui/ydgx1auuyfk3ymdazvyj.png"
                      }
                      alt=""
                    />
                  </ConnectButton>
                  <ConnectButton
                    name={connectors[2].name}
                    func={() => connect({ connector: connectors[2] })}
                  >
                    <span>
                      <Mail />
                    </span>
                  </ConnectButton>

                  <ConnectButton
                    name={connectors[3].name}
                    func={() => connect({ connector: connectors[3] })}
                  >
                    <img
                      alt=""
                      src={
                        "https://res.cloudinary.com/dc3gdzgel/image/upload/v1727178076/seamlessui/wxgfvezoxlpjvgfnxh3v.png"
                      }
                    />
                  </ConnectButton>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 hidden h-full w-[1px] -translate-x-1/2 bg-gray-300 lg:block"></div>
          <WalletInfo />
        </div>
      </div>
    </div>
  );
}

function ConnectButton({
  name,
  children,
  func,
}: {
  name: string;
  children: ReactNode;
  func: () => void;
}) {
  return (
    <button
      onClick={func}
      className="mx-auto flex h-[104px] w-full max-w-[104px] flex-col items-center justify-center gap-2 rounded-[12px] border-[1px] border-solid border-transparent p-2 text-sm hover:border-grey-200 hover:bg-grey-100 focus:border-grey-200 focus:bg-grey-100 focus:outline-none"
    >
      {children}
      <span className="text-xs capitalize">{name}</span>
    </button>
  );
}

function WalletInfo() {
  return (
    <div className="hidden flex-col lg:flex">
      <button
        //@ts-ignore
        popovertarget="connect-modal"
        className="mb-16 ml-auto w-fit"
      >
        <X />
        <span className="sr-only">Close menu</span>
      </button>
      <h4 className="mb-8 text-center text-lg font-bold">What is a Wallet ?</h4>

      <div className="flex flex-col gap-4 p-4 text-sm">
        <div className="grid grid-cols-9 items-center">
          <div className="col-span-2 h-[54px] w-[54px] rounded-[12px]">
            <img
              className="rounded-[12px] object-contain"
              src="https://res.cloudinary.com/dc3gdzgel/image/upload/v1727178076/seamlessui/x6uvbhfbn5dezd1j0py9.png"
              alt=""
            />
          </div>
          <div className="col-span-7">
            <p className="font-bold">A Home for Your Digital Assets</p>
            <p className="text-xs">
              Wallets are used to send, receive, store, and display digital
              assets like Ethereum and NFTs.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-9 items-center">
          <div className="col-span-2 h-[54px] w-[54px] rounded-[12px]">
            <img
              className="rounded-[12px] object-contain"
              src="https://res.cloudinary.com/dc3gdzgel/image/upload/v1727178076/seamlessui/x6uvbhfbn5dezd1j0py9.png"
              alt=""
            />
          </div>
          <div className="col-span-7">
            <p className="font-bold">A New Way to Sign in</p>
            <p className="text-xs">
              Instead of creating new accounts and passwords on every website,
              just connect your wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
