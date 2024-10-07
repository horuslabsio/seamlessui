import Image from "next/image";
import { GithubIcon, SearchIcon } from "@/public/icons/icons";

const Header = () => {
  return (
    <header className="mx-auto flex items-center justify-between px-[2rem] py-[1.5rem] seamlessui-container">
      <div className="flex items-center gap-1">
        <div className="h-[46px] w-[46px] bg-grey-50">
          <Image
            src={"/logo.png"}
            alt="logo"
            className="h-full w-full"
            width={56}
            height={56}
          />
        </div>
        <h2 className="text-lg font-bold">Starknet UI Kit</h2>
      </div>
      <div className="flex items-center justify-between gap-8">
        <nav className="flex gap-12 font-bold">
          <a href="">Components</a>
          <a href="">Components</a>
          <a href="">Docs</a>
        </nav>
        <div className="flex items-center gap-8">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1/2 ml-4 -translate-y-1/2"
            >
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="search"
              className="h-[45px] w-[214px] rounded-[12px] bg-[#EAEAEA] py-2 pl-12"
            />
          </div>
          <a href="https://github.com/horuslabsio/seamlessui">
            <GithubIcon />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
