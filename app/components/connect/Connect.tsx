"use client";

import { useConnect, useAccount, useDisconnect } from "@starknet-react/core";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function Connect({
  theme,
  layout,
}: {
  theme: "dark" | "light";
  layout: "list" | "grid";
}) {
  const connectPopover = useRef<HTMLDivElement>(null);
  const { connect, connectors, status: connectStatus } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  useEffect(() => {
    if (connectStatus === "error" || connectStatus === "success") {
      // @ts-expect-error: Expecting an error because React doesn't recognize the popover API.
      connectPopover.current.hidePopover();
    }
  }, [connectStatus]);

  // Helper function to shorten the address
  const shortenAddress = (address: string) => {
    return address
      ? `${address.slice(0, 6)}...${address.slice(address.length - 3)}`
      : "";
  };

  return (
    <>
      <div className="grid w-full place-content-center">
        <button
          onClick={() => {
            if (address) {
              disconnect();
            } else {
              // @ts-expect-error : Expecting an error because React doesn't recognize the popover API.
              connectPopover.current.showPopover();
            }
          }}
          aria-haspopup="menu"
          className="min-w-[8rem] rounded-[8px] bg-blue-700 px-4 py-2"
        >
          {address ? shortenAddress(address) : "connect"}
        </button>
      </div>

      <div
        popover="auto"
        id="connect-modal"
        ref={connectPopover}
        className="bg-transparent"
      >
        <div
          className={`relative h-[90vh] max-h-[390px] w-[90vw] max-w-[400px] overflow-scroll rounded-[24px] p-8 text-base lg:grid lg:h-[30rem] lg:max-h-[480px] lg:w-[70vw] lg:max-w-[46rem] lg:grid-cols-5 ${theme === "light" ? "bg-base-light bg-light-linear-gradient text-blue-700" : "bg-base-dark bg-dark-linear-gradient text-grey-50"}`}
        >
          {connectStatus === "pending" && <Loading />}
          <div className="relative col-span-2">
            <div className="mb-4 flex justify-between">
              <h3 className="text-xl font-bold lg:mb-8">Connect Wallet</h3>

              <button
                // @ts-expect-error: Expecting an error because React doesn't recognize the popover API.
                popovertarget="connect-modal"
                className="w-fit lg:hidden"
              >
                <X />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <div>
              <h4 className="mb-8 font-bold">Popular</h4>

              <div
                className={`${layout === "list" ? "flex w-full flex-col gap-2 lg:pr-8" : "grid grid-cols-2 gap-4 lg:w-fit"}`}
              >
                {connectors.map((connector) => {
                  const { name, icon } = connector;
                  return (
                    <ConnectButton
                      key={name}
                      theme={theme}
                      layout={layout}
                      name={name}
                      func={() => connect({ connector })}
                      src={icon}
                    ></ConnectButton>
                  );
                })}
              </div>
            </div>
            <div className="absolute -top-[2rem] right-0 hidden h-[calc(100%+4rem)] w-[1px] -translate-x-1/2 bg-gray-300 lg:block"></div>
          </div>

          <WalletInfo />
        </div>
      </div>
    </>
  );
}

function ConnectButton({
  name,
  func,
  layout,
  theme,
  src,
}: {
  name: string;
  func: () => void;
  layout: "list" | "grid";
  theme: "dark" | "light";
  src: string | { dark: string; light: string };
}) {
  const [base64DataUrl, setBase64DataUrl] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const svgToBase64 = (
      svgString: string | { dark: string; light: string }
    ) => {
      if (typeof svgString === "string") {
        return svgString.startsWith("<svg")
          ? `data:image/svg+xml;base64,${btoa(svgString)}`
          : svgString;
      }
      return svgString.light.startsWith("<svg")
        ? `data:image/svg+xml;base64,${btoa(svgString.light)}`
        : svgString.light;
    };

    setBase64DataUrl(svgToBase64(src));
  }, [src]);

  return (
    <button
      onClick={func}
      className={`flex w-full items-center gap-2 rounded-[12px] border-[1px] border-solid border-transparent text-sm focus:outline-none ${theme === "light" ? "bg-transparent hover:border-grey-200 hover:bg-grey-100 focus:border-grey-200 focus:bg-grey-100" : "bg-grey-900 hover:border-grey-700 hover:bg-grey-800 focus:border-grey-700 focus:bg-grey-800"} ${layout === "list" ? "flex-row p-3" : "mx-auto h-[104px] flex-col justify-center p-1 lg:max-w-[104px]"}`}
    >
      <img
        className="h-[24px] w-[24px]"
        src={base64DataUrl || "https://placehold.co/24x24"}
        alt={`${name} icon`}
        width={24}
        height={24}
      />
      <span className="text-xs capitalize">{name}</span>
    </button>
  );
}

function WalletInfo() {
  return (
    <div className="col-span-3 hidden flex-col lg:flex">
      <button
        // @ts-expect-error: Expecting an error because React doesn't recognize the popover API.
        popovertarget="connect-modal"
        popovertargetaction="hide"
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

function Loading() {
  return (
    <div
      role="alert"
      className="absolute left-0 top-0 z-10 grid h-full w-full place-content-center rounded-[24px] bg-[#ffffff81]"
    >
      <span
        className="mx-auto inline-block h-[38px] w-[38px] animate-spin rounded-full border-2 border-blue-700 border-b-transparent"
        aria-label="Loading"
      ></span>
    </div>
  );
}
