"use client";

import { useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useCookies } from "react-cookie";
import { i18n, Locale } from "@/i18n-config";
import Image from "next/image";

export default function Settings() {
  const [cookies] = useCookies(["locale"]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { t, updateLocale } = useTranslation();
  const [explorer, setExplorer] = useState<string>("voyager");
  const [enabled, setEnabled] = useState(false);

  const connectPopover = useRef<HTMLDivElement>(null);
  const [selectedLocale, setSelectedLocale] = useState<string>(
    i18n.defaultLocale
  ); // Default to 'en'

  // Set the default value from the cookie on component mount
  useEffect(() => {
    const cookieLocale = cookies.locale;
    if (
      cookieLocale &&
      i18n.locales.some((loc) => loc.symbol === cookieLocale)
    ) {
      setSelectedLocale(cookieLocale);
    }
  }, [cookies]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale: Locale = e.target.value as Locale;
    updateLocale(newLocale);
  };

  useEffect(() => {
    setTheme(enabled ? "dark" : "light");
  }, [enabled]);

  const filledStyle =
    theme === "dark"
      ? "bg-grey-50 border-grey-50 text-base-dark"
      : "bg-base-dark border-base-dark text-grey-50";

  const outlinedStyle =
    theme === "dark"
      ? "border-grey-50 text-grey-50"
      : "border-base-dark text-base-dark";

  return (
    <>
      <div className="grid w-full place-content-center">
        <button
          onClick={() => connectPopover.current?.showPopover()}
          aria-haspopup="menu"
          className="min-w-[8rem] rounded-[8px] bg-blue-700 px-4 py-2"
        >
          {t("settings").toLowerCase()}
        </button>
      </div>

      <div
        popover="auto"
        id="connect-modal"
        ref={connectPopover}
        className="bg-transparent"
      >
        <div
          className={`relative max-h-[390px] w-[90vw] max-w-[400px] overflow-auto rounded-[12px] px-[18px] py-6 text-base md:rounded-[24px] md:p-8 lg:max-h-[480px] lg:w-[594px] lg:max-w-[46rem] ${theme === "light" ? "bg-base-light bg-light-linear-gradient text-blue-700" : "bg-base-dark bg-dark-linear-gradient text-grey-50"}`}
        >
          <div className="relative flex w-full flex-col gap-[18px] md:gap-8">
            <div className="mb-4 flex items-start justify-between pt-2">
              <h3 className="text-[13.939px] font-bold lg:text-2xl">
                {t("settings")}
              </h3>

              <button
                onClick={() => connectPopover.current?.hidePopover()}
                className="ml-auto w-fit"
              >
                <X />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            {/* Language and Explorer Controls */}
            <div className="flex flex-col gap-3">
              <div
                className={`flex items-center justify-between rounded-lg border py-[11.62px] pl-[9.29px] pr-[13.94px] md:py-5 md:pl-4 md:pr-6 ${theme === "light" ? "border-grey-300 bg-grey-10" : "border-grey-700 bg-grey-600"}`}
              >
                <p className="text-[10.455px] font-bold md:text-lg">
                  {t("language")}
                </p>
                <div className="relative">
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-2 top-2 md:top-3"
                  />
                  <label
                    htmlFor="language"
                    className="block min-w-[87px] text-sm font-medium leading-6 text-gray-900 md:min-w-[150px]"
                  >
                    <select
                      id="language"
                      name="language"
                      value={selectedLocale}
                      className={`block w-full appearance-none rounded-md px-[6.97px] py-[4.65px] pr-10 text-[9.293px] font-bold tracking-[0.64px] ring-1 ring-inset ring-transparent focus:outline-none focus:ring-1 focus:ring-grey-500 sm:text-sm sm:leading-6 md:px-3 md:py-2 ${theme === "light" ? "bg-grey-300" : "bg-grey-700 text-white"}`}
                      onChange={handleChange}
                    >
                      {i18n.locales.map((locale) => (
                        <option key={locale.symbol} value={locale.symbol}>
                          {locale.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              {/* Explorer Options */}
              <div
                className={`flex items-center justify-between rounded-lg border py-[11.62px] pl-[9.29px] pr-[13.94px] md:py-5 md:pl-4 md:pr-6 ${theme === "light" ? "border-grey-300 bg-grey-10" : "border-grey-700 bg-grey-600"}`}
              >
                <p className="text-[10.455px] font-bold md:text-lg">
                  {t("explorer")}
                </p>
                <div className="relative flex space-x-3">
                  <button
                    onClick={() => setExplorer("voyager")}
                    className={`rounded border px-[10.45px] py-[4.65px] text-[9.293px] font-bold leading-[150%] tracking-[0.64px] md:rounded-lg md:border-2 md:px-[18px] md:py-2 md:text-base ${
                      explorer === "voyager" ? filledStyle : outlinedStyle
                    }`}
                  >
                    {t("voyager")}
                  </button>
                  <button
                    onClick={() => setExplorer("starkscan")}
                    className={`rounded border px-[6.97px] py-[4.65px] text-[9.293px] font-semibold leading-[150%] tracking-[0.64px] md:rounded-lg md:border-2 md:px-3 md:py-2 md:text-base ${
                      explorer === "starkscan" ? filledStyle : outlinedStyle
                    }`}
                  >
                    {t("starkscan")}
                  </button>
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <div
                className={`flex items-center justify-between rounded-lg border py-[11.62px] pl-[9.29px] pr-[13.94px] md:py-5 md:pl-4 md:pr-6 ${theme === "light" ? "border-grey-300 bg-grey-10" : "border-grey-700 bg-grey-600"}`}
              >
                <p className="text-[10.455px] font-bold md:text-lg">
                  {t("dark_mode")}
                </p>
                <div
                  onClick={() => setEnabled(!enabled)}
                  className={`flex h-5 w-9 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 md:h-7 md:w-14 ${enabled ? "bg-grey-50" : "border-[3px] border-black bg-transparent"}`}
                >
                  <div
                    className={`h-2 w-2 transform rounded-full shadow-md transition-transform duration-300 md:h-4 md:w-4 ${enabled ? "translate-x-5 bg-grey-600 md:translate-x-8" : "translate-x-0 bg-black"}`}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-start gap-6">
              <div className="h-auto w-[18.59px] md:w-[32px]">
                <Image
                  src="/twitter.svg"
                  alt="twitter icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="h-auto w-[18.59px] md:w-[32px]">
                <Image
                  src="/discord.svg"
                  alt="discord icon"
                  width={100}
                  height={100}
                />
              </div>
              <div className="h-auto w-[18.59px] md:w-[32px]">
                <Image
                  src="/telegram.svg"
                  alt="telegram icon"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
