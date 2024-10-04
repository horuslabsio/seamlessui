import Connect from "../widgets/connect/Connect";
import { Highlight } from "@seamlessui/ui/highlight";
import Leaderboard from "../widgets/leaderboard/Leaderboard";
import NFTCard from "../widgets/nftCard/NftCard";
import Swap from "../widgets/swap/swap";
interface NFTData {
  name: string;
  collection: string;
  price: number;
  ethPrice: number;
  image: string;
}

export default function Page(): JSX.Element {
  const nftData: NFTData = {
    name: "Peng Warrior #320",
    collection: "Peng Warriors",
    price: 10.005,
    ethPrice: 0.0001,
    image: "./turborepo.svg",
  };
  return (
    <main>
      {/* <Highlight code={`<Connect layout="list" theme="light" />`} /> */}
      {/* <Connect layout="list" theme="light" /> */}
      {/* <Leaderboard theme="dark" /> */}
      {/* <NFTCard layout="grid" theme="dark" nft={nftData} /> */}
      {/* <Swap theme="dark" /> */}
    </main>
  );
}
