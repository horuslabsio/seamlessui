import NftImg from "@/app/preview/nftcard/nft.svg";
import NFTCard from "@/app/widgets/nftCard/NftCard";
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
      <NFTCard theme="light" layout="grid" nft={nftData} />
      <NFTCard theme="dark" layout="grid" nft={nftData} />
      <NFTCard theme="light" layout="list" nft={nftData} />
      <NFTCard theme="dark" layout="list" nft={nftData} />
      <NFTCard theme="light" layout="grid" nft={nftData} />
      <NFTCard theme="light" layout="list" nft={nftData} />
    </div>
  );
};

export default NFTCardPreview;
