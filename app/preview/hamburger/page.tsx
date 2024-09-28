import Hamburger from "@/app/components/hamburger/hamburger";

const page = () => {
  return (
    <div className="pt-16">
      <h1 className="text-center text-3xl">
        Hamburger components (Light and Dark Theme)
      </h1>
      <div className="mt-10 flex flex-row items-center gap-[40%]">
        <Hamburger theme="light" />
        <Hamburger theme="dark" />
      </div>
    </div>
  );
};

export default page;
