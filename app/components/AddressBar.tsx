"use client";
import {
  useAccount,
  useDisconnect,
  useStarkProfile,
  useReadContract,
  Address,
} from "@starknet-react/core";
import Erc20Abi from "../../public/abi/erc20.json";
import Close from "../../public/svg/Close";
import { formatCurrency } from "../utils/helpers";
import { ETH_SEPOLIA, STRK_SEPOLIA } from "../utils/constant";
import CopyButton from "./CopyButton";
import EthLogo from "@/public/svg/EthLogo";
import StrkLogo from "@/public/svg/StrkLogo";

function AccountBalance({
  theme,
  address,
  heading = true,
}: {
  theme: "light" | "dark";
  address: string;
  heading?: boolean;
}) {
  const { data: eth } = useReadContract({
    abi: Erc20Abi,
    functionName: "balanceOf",
    address: ETH_SEPOLIA as Address,
    args: [address!],
    watch: true,
  });

  const { data: strk } = useReadContract({
    address: STRK_SEPOLIA as Address,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [address!],
    watch: true,
  });

  // @ts-ignore
  const ethBalance = formatCurrency(eth?.balance.low.toString());
  // @ts-ignore
  const strkBalance = formatCurrency(strk?.balance?.low.toString());

  return (
    <div
      className={`rounded-[12px] ${theme === "light" ? "bg-[#DADADA]" : "bg-[#3A3A3A]"} my-2 p-4 transition-colors duration-500 ease-linear md:my-3 md:p-8`}
    >
      {heading && (
        <h3 className="mb-2 text-sm text-[#7A7A7A] md:mb-4 md:text-base">
          Assets
        </h3>
      )}

      <div
        className={`flex flex-col gap-2 ${theme === "light" ? "text-[#141925]" : "text-[#FAFAFA]"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="h-7 w-7 rounded-full md:h-8 md:w-8">
              <EthLogo />
            </div>
            <div>
              <p className="text-sm md:text-base">ETH</p>
              <p className="text-xs text-[#7A7A7A] md:text-sm">Ethereum</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm md:text-base">{ethBalance.toFixed(4)}</p>
            <p className="text-xs text-[#7A7A7A] md:text-sm">$10.005</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="h-7 w-7 rounded-full md:h-8 md:w-8">
              <StrkLogo />
            </div>
            <div>
              <p className="text-sm md:text-base">STRK</p>
              <p className="text-xs text-[#7A7A7A] md:text-sm">
                Starknet Token
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm md:text-base">{strkBalance.toFixed(4)}</p>
            <p className="text-xs text-[#7A7A7A] md:text-sm">$1,570.05</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const UserModal = ({
  theme,
  showAssets,
}: {
  theme: "light" | "dark";
  showAssets: boolean;
}) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: starkProfile } = useStarkProfile({
    address,
  });

  return (
    <div popover="auto" id="user-popover" className="bg-transparent px-6">
      <div
        className={`relative h-fit w-[280px] overflow-auto rounded-[12px] px-6 py-4 text-xs font-bold transition-colors duration-500 ease-linear md:w-[345px] lg:w-[748px] lg:rounded-[24px] lg:text-base ${theme === "light" ? "bg-white text-blue-700" : "bg-[#1A1A1A] text-[#fafafa]"}`}
      >
        <div className="mb-[10px] flex justify-between text-base md:text-2xl md:leading-9">
          <h3 className="font-bold">Connected</h3>
          <button
            // @ts-ignore
            popovertarget="user-popover"
          >
            <Close />
          </button>
        </div>

        <div className="mb-3 flex w-full flex-col items-center md:mb-7">
          <div
            className={`mx-auto mb-2 h-16 w-16 overflow-clip rounded-full border-[1.3px] md:mb-4 ${theme === "light" ? "border-[#DADADA]" : "border-[#494949]"} md:h-24 md:w-24`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                starkProfile
                  ? starkProfile.profilePicture
                  : "/assets/default_pfp.png"
              }
              className="w-full rounded-full"
              alt="starknet profile"
            />
          </div>
          <CopyButton
            copyText={starkProfile?.name || address || ""}
            buttonText={
              starkProfile?.name ||
              address?.slice(0, 7).concat("...").concat(address?.slice(-5))
            }
            className={`flex items-center gap-2 text-sm font-bold md:text-2xl ${theme === "light" ? "text-[#1A1A1A]" : "text-[#FAFAFA]"}`}
            iconClassName={`rounded-full ${theme === "light" ? "bg-[#F5F5F5] text-[#1a1a1a]" : "bg-[#343434] text-[#FAFAFA]"} p-1 `}
          />
        </div>
        {showAssets && <AccountBalance theme={theme} address={address || ""} />}

        <button
          onClick={() => {
            const popover = document.getElementById("user-popover");
            // @ts-ignore
            popover.hidePopover();
            disconnect();
          }}
          className={`w-full ${theme === "light" ? "border-[#EEEEEE] bg-[#F7F7F7]" : "border-[#494949] bg-[#1E1E1E]"} rounded-[12px] border-[1.25px] border-solid p-3 text-sm leading-5 text-[#CC3333] md:p-4 md:text-base`}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

const AddressBar = ({
  theme,
  showAssets = false,
}: {
  theme: "light" | "dark";
  showAssets?: boolean;
}) => {
  const { address } = useAccount();
  const { data: starkProfile } = useStarkProfile({
    address,
  });
  if (!address) {
    return null;
  }

  const togglePopover = ({ targetId }: { targetId: string }) => {
    const popover = document.getElementById(targetId);
    // @ts-ignore
    popover.togglePopover();
    if (popover) {
      popover.addEventListener("toggle", () => {
        if (popover.matches(":popover-open")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      });
    }
  };

  return (
    <>
      <button
        aria-haspopup="dialog"
        onClick={() => togglePopover({ targetId: "user-popover" })}
        className={`flex items-center gap-x-1 rounded-full border-[1px] ${theme === "light" ? "border-[#DADADA] bg-[#F5F5F5] text-[#141925]" : "border-[#494949] bg-[#3A3A3A] text-[#FAFAFA]"} px-[10px] py-2 text-[13px] font-bold leading-4 md:px-5 md:py-2 md:text-xl md:leading-[34px]`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            starkProfile
              ? starkProfile.profilePicture
              : "/assets/default_pfp.png"
          }
          className="h-6 w-6 rounded-full md:h-8 md:w-8"
          alt="starknet profile"
        />
        <span className="">
          {starkProfile?.name
            ? starkProfile.name
            : address?.slice(0, 6).concat("...").concat(address?.slice(-5))}
        </span>
        <CopyButton copyText={address} />
      </button>
      <UserModal theme={theme} showAssets={showAssets} />
    </>
  );
};

export default AddressBar;
