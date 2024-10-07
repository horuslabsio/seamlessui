import Settings from "@/app/widgets/settings/Settings";

const page = () => {
  return (
    <div className="pt-16">
      <h1 className="text-center text-3xl">Settings component</h1>
      <div className="mt-10 flex flex-wrap lg:flex-nowrap">
        <Settings />
      </div>
    </div>
  );
};

export default page;
