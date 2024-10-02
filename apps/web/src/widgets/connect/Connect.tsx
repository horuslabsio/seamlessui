"use client";

import { useConnect, useAccount, useDisconnect } from "@starknet-react/core";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Loading } from "@seamlessui/ui/loading";

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
          className={`relative max-h-[390px] w-[90vw] max-w-[25rem] rounded-[24px] p-8 text-base lg:max-h-[480px] ${theme === "light" ? "bg-base-light bg-light-linear-gradient text-blue-700" : "bg-base-dark bg-dark-linear-gradient text-grey-50"}`}
        >
          {connectStatus === "pending" && <Loading />}

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold lg:text-2xl">Connect</h3>

            <button
              // @ts-expect-error: Expecting an error because React doesn't recognize the popover API.
              popovertarget="connect-modal"
              className={`w-fit rounded-full p-1 ${theme === "light" ? "" : "bg-grey-800"}`}
            >
              <X />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div>
            <h4 className="mb-8 font-bold">Popular</h4>
            <div
              className={`w-full ${layout === "list" ? "flex flex-col gap-2" : "grid grid-cols-3 gap-2 lg:grid-cols-2"}`}
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
      className={`flex w-full items-center gap-4 rounded-[12px] border-[1px] border-solid border-transparent text-sm focus:outline-none ${theme === "light" ? "bg-transparent hover:border-grey-200 hover:bg-grey-100 focus:border-grey-200 focus:bg-grey-100" : "bg-grey-900 hover:border-grey-700 hover:bg-grey-800 focus:border-grey-700 focus:bg-grey-800"} ${layout === "list" ? "flex-row p-3" : "mx-auto h-[104px] flex-col justify-center p-1 lg:h-[124px]"}`}
    >
      <img
        className="h-[24px] w-[24px]"
        src={base64DataUrl || "https://placehold.co/24x24"}
        alt={`${name} icon`}
      />
      <span className="text-xs capitalize lg:text-sm">{name}</span>
    </button>
  );
}
