"use client";
import Image from "next/image";
import Gradient from "@/app/ui/Gradient";
import HERO_IMG from "@/public/assets/hero-img.svg";
import { RightArrow } from "@/public/icons/icons";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="min-h-svh">
      <section className="mx-auto flex max-h-[100vh] flex-row justify-between pt-[12rem] seamlessui-container lg:flex-row">
        <div className="px-8 lg:basis-[55%]">
          <h1 className="mb-8 max-w-[700px] text-4xl font-extrabold leading-[1.25] lg:text-6xl">
            Deploy your dApps smarter & faster with web3 components
          </h1>
          <p className="mb-8 text-[#4A4A4A]">
            UI kits professionally designed, fully responsive, expertly crafted
            component examples you can add to your Starknet projects and
            customize to your style.
          </p>
          <button
            onClick={() => router.push("/components")}
            className="group flex items-center gap-2 rounded-[12px] bg-base-dark px-6 py-3 text-base-light"
          >
            <span>Explore Components</span>
            <span className="text-[1.4em] transition-all duration-300 group-hover:-rotate-[20deg]">
              <RightArrow />
            </span>
          </button>
        </div>
        <div aria-hidden={true} className="justify-end">
          <Image src={HERO_IMG} alt="" />
        </div>
      </section>
    </main>
  );
}
