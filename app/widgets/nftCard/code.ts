import { ThemeProps, VariantsProps } from "@/types";

export const nftCardCodeGen = ({
  theme,
  variant,
}: {
  theme?: ThemeProps;
  variant?: VariantsProps;
}) => `
import React from "react";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

interface NFTData {
  name: string;
  collection: string;
  price: number;
  ethPrice: number;
  image: string;
}

interface NFTCardProps {
  theme: "dark" | "light";
  layout: "list" | "grid";
  nft: NFTData;
}

const NFTCard: React.FC<NFTCardProps> = ({ theme, layout, nft }) => {
  const isDark = theme === "dark";
  const isList = layout === "list";
  return (
    <div
      style={{
        background:
          theme === "light"
            ? ""
            : "linear-gradient(169.58deg, #E1852D -79.18%, #212121 19.19%, #1A1A1A 56.31%)",
      }}
      className="my-auto grid ${
        variant === "list"
          ? "w-[345px] min-w-[280px] grid-cols-1 md:max-h-[232px] md:w-full md:min-w-[431px] md:max-w-[431px] md:grid-cols-[130px_120px_130px]"
          : "w-[345px] min-w-[280px] grid-cols-1 md:w-[431px] md:max-w-[345px]"
      } gap-3 overflow-hidden rounded-xl p-3 ${
        theme === "dark" ? "bg-[#1A1A1A] text-white" : "bg-white text-[#141925]"
      } shadow-lg"
    >
      <div
        className="relative aspect-square rounded-xl ${variant === "list" ? "md:max-h-[144px] md:max-w-[200px]" : ""}"
      >
        <Image
          fill
          src={nft.image}
          alt={nft.collection}
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
      <div
        className="grid grid-rows-[auto_1fr_auto] ${variant === "list" ? "md:col-span-2 md:items-center md:gap-1 md:pt-3" : "pt-3"}"
      >
        <h3 className="truncate text-lg font-bold">{nft.name}</h3>
        <div
          className="flex justify-between ${variant === "list" ? "md:flex-col md:justify-start md:gap-1" : "flex-row items-center justify-between"}"
        >
          <div className="flex items-center gap-2">
            <button
              className="rounded-xl p-2 ${
                theme === "dark"
                  ? "border border-[#343434] hover:bg-[#494949]"
                  : "border border-[#DADADA] hover:bg-[#EEEEEE]"
              }"
              // disabled={true}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99984 1.33325L3.33317 8.23325L7.99984 10.8999L12.6665 8.23325L7.99984 1.33325Z"
                  stroke={isDark ? "#FFFFFF" : "#1F2937"}
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.33317 8.23325L7.99984 14.6666L12.6665 8.23325"
                  stroke={isDark ? "#FFFFFF" : "#1F2937"}
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.33317 9.33325L7.99984 11.9999L12.6665 9.33325"
                  stroke={isDark ? "#FFFFFF" : "#1F2937"}
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <p
              className="text-sm font-bold ${
                theme === "dark" ? "text-[#FAFAFA]" : "text-[#141925]"
              }"
            >
              {nft.ethPrice.toFixed(4)} ETH
            </p>
          </div>
          <p
            className="justify-self-end text-sm font-bold ${
              theme === "dark" ? "text-[#FAFAFA]" : "text-[#141925]"
            }"
          >
            \${nft.price.toFixed(3)}
          </p>
        </div>
      </div>
      <div
        className="grid grid-cols-[1fr_auto] gap-2 ${variant === "list" ? "md:col-span-3" : ""}"
      >
        <button
          className="rounded-lg px-4 py-2 text-sm font-bold ${
            theme === "dark"
              ? "bg-[#FAFAFA] text-[#1A1A1A] hover:bg-[#EEEEEE]"
              : "bg-[#1A1A1A] text-[#FAFAFA] hover:bg-[#343434]"
          }"
        >
          Add to Buy
        </button>
        <button
          className="rounded-lg border-[1.75px] ${theme === "dark" ? "border-[#494949] bg-[#3A3A3A] hover:bg-[#313131]" : "border-[#EEEEEE] bg-[#F7F7F7] hover:bg-[#EEEEEE]"} p-2"
        >
          <EllipsisVertical
            className="h-5 w-5 ${theme === "dark" ? "text-[#FAFAFA]" : "text-[#1A1A1A]"}"
          />
        </button>
      </div>
    </div>
  );
};

export default NFTCard;
`;
