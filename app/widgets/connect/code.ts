import { ThemeProps, VariantsProps } from "@/types";

export const connectCodeGen = ({
  theme,
  variant,
}: {
  theme?: ThemeProps;
  variant?: VariantsProps;
}) => `
"use client";

import { useConnect, useAccount, useDisconnect } from "@starknet-react/core";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Loading } from "@/app/utilities/Loading";

export default function Connect() {
  const connectPopover = useRef<HTMLDialogElement>(null);
  const { connect, connectors, status: connectStatus } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  useEffect(() => {
    if (connectStatus === "error" || connectStatus === "success") {
      connectPopover.current?.close();
    }
  }, [connectStatus]);

  // Helper function to shorten the address
  const shortenAddress = (address: string) => {
    return address
      ? \`\${address.slice(0, 6)}...\${address.slice(address.length - 3)}\`
      : "";
  };

  return (
    <>
      <div className="grid h-full w-full place-content-center">
        <button
          onClick={() => {
            if (address) {
              disconnect();
            } else {
              connectPopover.current?.showModal();
            }
          }}
          aria-haspopup="menu"
          className="min-w-[8rem] rounded-[8px] bg-blue-700 px-4 py-2 text-white"
        >
          {address ? shortenAddress(address) : "connect"}
        </button>
      </div>

      <dialog
        id="connect-modal"
        ref={connectPopover}
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
          className="relative max-h-[390px] w-[90vw] max-w-[25rem] rounded-[24px] p-8 text-base lg:max-h-[480px] ${theme === "light" ? "bg-white text-[#141925]" : "bg-[#1A1A1A] text-[#fafafa]"}"
        >
          {connectStatus === "pending" && <Loading />}

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold lg:text-2xl">Connect</h3>

            <button
              onClick={() => {
                connectPopover.current?.close();
              }}
              className="w-fit rounded-full p-1 ${theme === "light" ? "" : "bg-[#343434]"}"
            >
              <X />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div>
            <h4 className="mb-8 font-bold">Popular</h4>
            <div className="w-full ${variant === "list" ? "flex flex-col gap-2" : "grid grid-cols-3 gap-2 lg:grid-cols-2"}">
              {connectors.map((connector) => {
                const { name, icon } = connector;
                return (
                  <ConnectButton
                    key={name}
                    name={name}
                    func={() => connect({ connector })}
                    src={icon}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

function ConnectButton({
  name,
  func,

  src,
}: {
  name: string;
  func: () => void;
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
          ? \`data:image/svg+xml;base64,\${btoa(svgString)}\`
          : svgString;
      }
      return svgString.light.startsWith("<svg")
        ? \`data:image/svg+xml;base64,\${btoa(svgString.light)}\`
        : svgString.light;
    };

    setBase64DataUrl(svgToBase64(src));
  }, [src]);

  return (
    <button
      onClick={func}
      className="flex w-full items-center gap-4 rounded-[12px] border-[1px] border-solid border-transparent text-sm focus:outline-none ${theme === "light" ? "bg-transparent hover:border-[#EEEEEE] hover:bg-[#F7F7F7] focus:border-[#EEEEEE] focus:bg-[#F7F7F7]" : "bg-[#222222] hover:border-[#494949] hover:bg-[#343434] focus:border-[#494949] focus:bg-[#343434]"} ${variant === "list" ? "flex-row p-3" : "mx-auto h-[104px] flex-col justify-center p-1 lg:h-[124px]"}"

    >
      <img
        className="h-[24px] w-[24px]"
        src={base64DataUrl || "https://placehold.co/24x24"}
        alt={\`\${name} icon\`}
      />
      <span className="text-xs capitalize lg:text-sm">{name}</span>
    </button>
  );
}
`;
