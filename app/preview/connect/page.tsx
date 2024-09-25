import Connect from "../../components/connect/Connect";

const page = () => {
  return (
    <div className="pt-16">
      <h1 className="text-center text-3xl">
        Connect components (Light and Dark Theme, List and Grid Layout)
      </h1>
      <div className="mt-10 flex flex-wrap lg:flex-nowrap">
        <Connect layout="grid" theme="light" />
        <Connect layout="grid" theme="dark" />
        <Connect layout="list" theme="light" />
        <Connect layout="list" theme="dark" />
      </div>
    </div>
  );
};

export default page;
