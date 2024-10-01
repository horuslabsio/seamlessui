import Swap from "@/app/components/swap/swap";

const page = () => {
  return (
    <div className="pt-16">
      <h1 className="text-center text-3xl">
        Swap components (Light and Dark Theme, List and Grid Layout)
      </h1>
      <div className="mt-10 flex flex-wrap lg:flex-nowrap">
        <Swap theme="light" />
        <Swap theme="dark" />
      </div>
    </div>
  );
};

export default page;
