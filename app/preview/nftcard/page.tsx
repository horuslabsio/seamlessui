import NFTCard from "@/app/components/nftCard/NftCard";
import NftImg from "@/app/preview/nftcard/nft.svg";
interface NFTData {
  name: string;
  collection: string;
  price: number;
  ethPrice: number;
  image: string;
}

const NFTCardPreview: React.FC = () => {
  const nftData: NFTData = {
    name: "Peng Warrior #320",
    collection: "Peng Warriors",
    price: 10.005,
    ethPrice: 0.0001,
    image: NftImg,
  };

  return (
    <div className="flex flex-wrap gap-8">
      <NFTCard theme="light" layout="grid" {...nftData} />
      <NFTCard theme="dark" layout="grid" {...nftData} />
      <NFTCard theme="light" layout="list" {...nftData} />
      <NFTCard theme="dark" layout="list" {...nftData} />
      <NFTCard theme="light" layout="grid" {...nftData} />
      <NFTCard theme="light" layout="list" {...nftData} />
    </div>
  );
};

export default NFTCardPreview;
