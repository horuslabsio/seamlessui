import Image from "next/image";
import logo from "../../public/logo.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-[4.5rem] py-[2rem]">
      <div className="flex basis-[45%] items-center">
        <Image src={logo} alt="logo" width={56} height={56} />
        <h2>Starknet UI Kit</h2>
      </div>
      <div className="flex flex-1 items-center justify-between">
        <nav className="flex gap-12">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                  stroke-width="32"
                  d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="32"
                  d="M338.29 338.29L448 448"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="search"
              className="h-[45px] w-[214px] rounded-[12px] bg-[#EAEAEA] py-2 pl-12"
            />
          </div>
          <a href="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
