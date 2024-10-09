"use client";

import { PersonFeedbackIcon, RightArrow } from "@/public/icons/icons";
import { X } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/assets/logo.png";
import { useEffect, useRef } from "react";

const Feedback = () => {
  const feedbackModal = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const visitData = JSON.parse(localStorage.getItem("visitData") || "{}");

    const now = new Date().getTime();
    const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (
      !visitData.hasVisited ||
      (visitData.timestamp && now - visitData.timestamp > expirationTime)
    ) {
      setTimeout(() => {
        if (feedbackModal.current) {
          feedbackModal.current.showModal();
        }
        const updatedVisitData = {
          hasVisited: true,
          timestamp: now,
        };

        localStorage.setItem("visitData", JSON.stringify(updatedVisitData));
      }, 5000);
    }
  }, []);

  return (
    <>
      <button
        onClick={() => {
          if (feedbackModal.current) {
            feedbackModal.current.showModal();
          }
        }}
        className="fixed right-0 top-1/2 z-[9999] h-[7rem] w-6 -translate-y-1/2 transform-gpu rounded-bl-[4px] rounded-tl-[4px] bg-base-dark text-base-light"
      >
        <span className="absolute left-1/2 top-1/2 inline-block -translate-x-1/2 -translate-y-1/2 -rotate-[90deg] font-normal">
          Feedback
        </span>
      </button>
      <dialog className="mx-auto my-auto bg-transparent" ref={feedbackModal}>
        <div className="flex max-h-[90vh] w-full max-w-[30rem] flex-col gap-8 overflow-auto rounded-[24px] bg-base-light bg-light-linear-gradient p-4 text-base-dark md:p-8">
          <div className="flex items-center justify-between border border-transparent border-b-black pb-4">
            <p className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-content-center rounded-full bg-base-dark p-1 text-[1.8em] text-white">
                <PersonFeedbackIcon />
              </span>
              <span> Feedback</span>
            </p>
            <button
              onClick={() => {
                feedbackModal.current?.close();
              }}
              className={`w-fit rounded-full p-1`}
            >
              <X />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <h2 className="flex-1 text-center text-2xl">
            How Can We Better Serve You?
          </h2>
          <div className="mx-auto grid h-[6rem] w-[6rem] place-content-center rounded-full bg-base-dark p-1">
            <Image src={Logo} alt="logo" />
          </div>

          <p className="text-center">
            Your insights help us improve. We’d love to hear your thoughts.
            please take a moment to fill out our feedback form.
          </p>
          <a
            autoFocus
            target="_blank"
            className="group flex w-full items-center justify-center gap-2 rounded-[12px] bg-base-dark px-6 py-3 text-base-light"
            href="https://a5ezisw9v33.typeform.com/to/Rg5LU91I"
          >
            <span>Share Your Feedback</span>
            <span className="text-[1.4em] transition-all duration-300 group-hover:-rotate-[20deg]">
              <RightArrow />
            </span>
          </a>
        </div>
      </dialog>
    </>
  );
};

export default Feedback;
