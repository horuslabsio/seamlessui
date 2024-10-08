"use client";

import Preview from "@/app/ui/Preview";
import Connect from "@/app/widgets/connect/Connect";
import Settings from "@/app/widgets/settings/Settings";
import Leaderboard from "../widgets/leaderboard/Leaderboard";
import { connectCodeGen } from "../widgets/connect/code";
import { settingsCodeGen } from "../widgets/settings/code";
import { leaderboardCodeGen } from "../widgets/leaderboard/code";
import Hamburger from "../widgets/hamburger/hamburger";
import NFTCard from "../widgets/nftCard/NftCard";
import NftImg from "@/app/preview/nftcard/nft.svg";
import Swap from "../widgets/swap/swap";
import TransactionList from "../widgets/transaction-history/transaction-history";
import { addTokenCodeGen } from "../widgets/add-token/code";
import AddToken from "../widgets/add-token/AddToken";
import { nftCardCodeGen } from "../widgets/nftCard/code";
import { hamburgerCodeGen } from "../widgets/hamburger/code";
import { swapCodeGen } from "../widgets/swap/code";

interface NFTData {
  name: string;
  collection: string;
  price: number;
  ethPrice: number;
  image: string;
}

const Components = () => {
  const nftData: NFTData = {
    name: "Peng Warrior #320",
    collection: "Peng Warriors",
    price: 10.005,
    ethPrice: 0.0001,
    image: NftImg,
  };

  return (
    <main className="mx-auto px-2 pb-12 seamlessui-container lg:px-[clamp(2rem,4vw,4rem)]">
      <section className="flex flex-col gap-20 pt-[10rem] md:pt-[18rem]">
        <Preview
          name="Connect"
          variants={["list", "grid"]}
          codeStringGenerator={connectCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
        >
          <Connect layout="list" theme="light" />
        </Preview>
        <Preview
          name="Settings"
          variants={["list", "grid"]}
          codeStringGenerator={settingsCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          layoutVariants={false}
          themeVariants={false}
        >
          <Settings />
        </Preview>

        <Preview
          name="Leader board"
          variants={["list", "grid"]}
          codeStringGenerator={leaderboardCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          layoutVariants={false}
        >
          <Leaderboard theme="dark" />
        </Preview>
        <Preview
          name="Add token"
          variants={[]}
          codeStringGenerator={addTokenCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          layoutVariants={false}
          full={false}
        >
          <AddToken full={false} theme="dark" />
        </Preview>
        <Preview
          codeStringGenerator={hamburgerCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          name="Hamburger"
          layoutVariants={false}
          variants={[]}
        >
          <Hamburger theme="dark" />
        </Preview>
        <Preview
          codeStringGenerator={nftCardCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          name="NFT Card"
          variants={["grid", "list"]}
        >
          <NFTCard theme="light" layout="grid" nft={nftData} />
        </Preview>

        <Preview
          codeStringGenerator={swapCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          name="Swap"
          variants={[]}
          layoutVariants={false}
        >
          <Swap theme="light" />
        </Preview>
        <Preview
          codeStringGenerator={leaderboardCodeGen}
          description="lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima exercitationem rem quos, at consequuntur magni blanditiis quae libero debitis repudiandae dolorum dicta amet explicabo nihil? Id voluptas nihil culpa! Reiciendis."
          name="Transaction List"
          variants={[]}
          layoutVariants={false}
        >
          <TransactionList theme="light" />
        </Preview>
      </section>
    </main>
  );
};

export default Components;
