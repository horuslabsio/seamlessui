import AddressBar from "@/app/components/AddressBar";
export default function Page() {
  return (
    <div className="flex gap-x-4">
      <AddressBar theme="dark" showAssets={true} />
      <AddressBar theme="light" showAssets={false} />
    </div>
  );
}
