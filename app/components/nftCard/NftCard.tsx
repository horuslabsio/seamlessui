"use client";
import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { useSwitchChain } from "@starknet-react/core";
import Image from "next/image";

interface NFTCardProps {
  theme: "dark" | "light";
  layout: "list" | "grid";
  name: string;
  collection: string;
  price: number;
  ethPrice: number;
  image: string;
}

const NFTCard: React.FC<NFTCardProps> = ({
  theme,
  layout,
  name,
  collection,
  price,
  ethPrice,
  image,
}) => {
  const isDark = theme === "dark";
  const isList = layout === "list";

  return (
    <div
      className={`grid ${
        isList
          ? "w-[345px] min-w-[280px] grid-cols-1 md:max-h-[232px] md:w-full md:min-w-[431px] md:max-w-[431px] md:grid-cols-[130px_120px_130px]"
          : "w-[345px] min-w-[280px] grid-cols-1 md:w-[431px] md:max-w-[345px]"
      } gap-3 overflow-hidden rounded-xl p-3 ${
        isDark
          ? "bg-base-dark bg-dark-linear-gradient text-white"
          : "bg-white text-[#141925]"
      } shadow-lg`}
    >
      <div
        className={`relative aspect-square rounded-xl ${isList ? "md:max-h-[144px] md:max-w-[200px]" : ""}`}
      >
        <Image
          fill
          src={image}
          alt={collection}
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
      <div
        className={`grid grid-rows-[auto_1fr_auto] ${isList ? "md:col-span-2 md:items-center md:gap-1 md:pt-3" : "pt-3"}`}
      >
        <h3 className="truncate text-lg font-bold">{name}</h3>
        <div
          className={`flex justify-between ${isList ? "md:flex-col md:justify-start md:gap-1" : "flex-row items-center justify-between"}`}
        >
          <div className="flex items-center gap-2">
            <button
              className={`rounded-xl p-2 ${
                isDark
                  ? "border border-gray-800 hover:bg-gray-700"
                  : "border border-[#DADADA] hover:bg-gray-200"
              }`}
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
              className={`text-sm font-bold ${
                isDark ? "text-[#FAFAFA]" : "text-[#141925]"
              }`}
            >
              {ethPrice.toFixed(4)} ETH
            </p>
          </div>
          <p
            className={`justify-self-end text-sm font-bold ${
              isDark ? "text-[#FAFAFA]" : "text-[#141925]"
            }`}
          >
            ${price.toFixed(3)}
          </p>
        </div>
      </div>
      <div
        className={`grid grid-cols-[1fr_auto] gap-2 ${isList ? "md:col-span-3" : ""}`}
      >
        <button
          className={`rounded-lg px-4 py-2 text-sm font-bold ${
            isDark
              ? "bg-[#FAFAFA] text-[#1A1A1A] hover:bg-gray-200"
              : "bg-[#1A1A1A] text-[#FAFAFA] hover:bg-gray-800"
          }`}
        >
          Add to Buy
        </button>
        <button className="rounded-lg border border-[#EEEEEE] bg-[#F7F7F7] p-2 hover:bg-gray-200">
          <EllipsisVertical className="h-5 w-5 text-[#1A1A1A]" />
        </button>
      </div>
    </div>
  );
};

export default NFTCard;
