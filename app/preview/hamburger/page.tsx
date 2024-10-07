import Hamburger from "@/app/widgets/hamburger/hamburger";

const page = () => {
  return (
    <div className="pt-16">
      <h1 className="text-center text-3xl">
        Hamburger components (Light and Dark Theme)
      </h1>
      <div className="mt-10 flex flex-row items-center gap-[15%]">
        <div className="relative w-1/3">
          <Hamburger theme="light" />
        </div>
        <div className="relative w-1/3">
          <Hamburger theme="dark" />
        </div>
      </div>
    </div>
  );
};

export default page;
