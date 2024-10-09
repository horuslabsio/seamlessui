"use client";
import Image from "next/image";
import HERO_IMG from "@/public/assets/hero-img.svg";
import { RightArrow } from "@/public/icons/icons";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-svh">
      <section className="mx-auto flex flex-col justify-between pt-[10rem] seamlessui-container md:max-h-[100vh] md:flex-row md:pt-[12rem]">
        <div className="max-w-[500px] px-4 md:max-w-none md:px-8 lg:basis-[55%]">
          <h1 className="mb-8 max-w-[700px] text-4xl font-extrabold leading-[1.25] md:text-5xl lg:text-6xl">
            Deploy your dApps smarter & faster with web3 components
          </h1>
          <p className="mb-8 text-[#4A4A4A]">
            UI kits professionally designed, fully responsive, expertly crafted
            component examples you can add to your Starknet projects and
            customize to your style.
          </p>
          <Button
            onClick={() => router.push("/components")}
            variant="big"
            className="group w-full md:w-fit"
          >
            <>
              <span>Explore Components</span>
              <span className="text-[1.4em] transition-all duration-300 group-hover:-rotate-[20deg]">
                <RightArrow />
              </span>
            </>
          </Button>
        </div>
        <div
          aria-hidden={true}
          className="ml-auto justify-end py-8 pl-4 md:p-0"
        >
          <Image priority src={HERO_IMG} alt="" />
        </div>
      </section>
    </main>
  );
}
