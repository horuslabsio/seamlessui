import Image from "next/image";
import { GithubIcon, HamburgerIcon, SearchIcon } from "@/public/icons/icons";
import Link from "next/link";
import Button from "./Button";

const Header = () => {
  return (
    <header className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center justify-between px-4 py-[1.5rem] seamlessui-container md:px-[2rem]">
      <Link href={"/"} className="flex items-center gap-1">
        <div className="h-[46px] w-[46px]">
          <Image
            src={"/assets/logo.png"}
            alt="logo"
            className="h-full w-full"
            width={56}
            height={56}
          />
        </div>
        <h2 className="text-lg font-bold">SeamlessUI</h2>
      </Link>
      {/* mobile menu */}
      <div className="flex items-center gap-4 lg:hidden">
        <Button variant="ghost" className="text-[1.8em]">
          <SearchIcon />
        </Button>
        <Button variant="ghost" className="text-[1.8em]">
          <HamburgerIcon />
        </Button>
      </div>
      {/* desktop */}
      <div className="hidden items-center justify-between gap-8 lg:flex">
        <nav className="flex gap-12 font-bold">
          <Link href={"/components"}>Components</Link>
          <Link href={"/"}>Docs</Link>
        </nav>
        <div className="flex items-center gap-8">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1/2 ml-4 -translate-y-1/2 text-[1.5em]"
            >
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search"
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
