"use client";

import AddToken from "@/app/components/add-token/AddToken";

const page = () => {
  return (
    <div className="pt-16">
      <h1 className="text-center text-3xl">
        Add Token component (Light and Dark Theme)
      </h1>
      <div className="mt-10 flex flex-wrap lg:flex-nowrap">
        <AddToken theme="dark" />
        <AddToken theme="light" />
      </div>
    </div>
  );
};

export default page;
