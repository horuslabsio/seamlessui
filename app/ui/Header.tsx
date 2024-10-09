import Image from "next/image";
import { GithubIcon, SearchIcon } from "@/public/icons/icons";
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g fill="none" fillRule="evenodd">
              <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
              <path
                fill="currentColor"
                d="M5.844 4.566C7.446 3.643 9.619 3 12 3s4.554.643 6.156 1.566c.8.462 1.488 1.01 1.987 1.615c.49.595.857 1.318.857 2.105c0 .792-.38 1.412-.99 1.821c-.544.365-1.25.553-1.981.667c-.58.09-1.259.145-2.019.177l-.786.026l-.837.015l-.885.006h-3.004l-.885-.006l-.837-.015l-.786-.026a19 19 0 0 1-2.019-.177c-.73-.114-1.437-.302-1.981-.667c-.61-.41-.99-1.03-.99-1.821c0-.787.366-1.51.857-2.105c.499-.604 1.186-1.153 1.987-1.615M5.4 7.454c-.19.229-.4.527-.4.839c0 .235.44.363.81.433l.233.038l.236.034q.565.086 1.291.13l.608.03l.66.02l.712.012l1.58.01l2.154-.001l.79-.005l.739-.009l.686-.016l.323-.011l.608-.03q.58-.036 1.059-.097l.298-.042l.393-.049c.379-.057.82-.17.82-.454c0-.16-.081-.446-.4-.832c-.311-.377-.795-.782-1.443-1.155C15.864 5.553 14.037 5 12 5s-3.864.553-5.157 1.3c-.648.372-1.132.777-1.443 1.154m-1.064 4.454a3 3 0 0 1 3.328 0l.781.52a1 1 0 0 0 1.11 0l.78-.52a3 3 0 0 1 3.33 0l.78.52a1 1 0 0 0 1.11 0l.78-.52a3 3 0 0 1 3.33 0l.924.616a1 1 0 1 1-1.11 1.664l-.924-.616a1 1 0 0 0-1.11 0l-.78.52a3 3 0 0 1-3.33 0l-.78-.52a1 1 0 0 0-1.11 0l-.78.52a3 3 0 0 1-3.33 0l-.78-.52a1 1 0 0 0-1.11 0l-.504.346c-.152.1-.316.203-.475.287a1 1 0 1 1-.932-1.769q.107-.056.204-.12zM4 15a1 1 0 0 0-1 1v1a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-1a1 1 0 0 0-1-1zm3 4a2 2 0 0 1-2-2h14a2 2 0 0 1-2 2z"
              />
            </g>
          </svg>
          {/* <HamburgerIcon /> */}
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
