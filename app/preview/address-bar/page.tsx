import AddressBar from "@/app/components/AddressBar";
export default function Page() {
  return (
    <div className="flex gap-x-4">
      <AddressBar theme="dark" showAssets={false} />
      <AddressBar theme="light" showAssets={true} />
    </div>
  );
}
