import Transaction from "@/app/components/transaction-history/transaction-history";

const page = () => {
  return (
    <div className="pt-16">
      <h1 className="text-center text-3xl">
        Transaction history components (Light and Dark Theme)
      </h1>
      <div className="mt-10 flex flex-row items-start gap-[20%]">
        <div className="relative w-1/3">
          <Transaction theme="light" />
        </div>
        <div className="relative w-1/3">
          <Transaction theme="dark" />
        </div>
      </div>
    </div>
  );
};

export default page;
