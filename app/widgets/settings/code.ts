export const settingsCodeGen = () => `
"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useCookies } from "react-cookie";
import { i18n, Locale } from "@/i18n-config";
import Image from "next/image";

export default function Settings() {
  const [cookies] = useCookies(["locale"]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { t } = useTranslation();
  const [explorer, setExplorer] = useState<string>("voyager");
  const [enabled, setEnabled] = useState(false);

  const settingsPopover = useRef<HTMLDialogElement>(null);
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
      <div className="grid h-full w-full place-content-center">
        <button
          onClick={() => settingsPopover.current?.showModal()}
          aria-haspopup="menu"
          className="min-w-[8rem] rounded-[8px] bg-blue-700 px-4 py-2 text-white"
        >
          {t("settings")}
        </button>
      </div>

      <dialog ref={settingsPopover} className="mx-auto my-auto bg-transparent">
        <div
          className={\`relative max-h-[390px] w-[90vw] max-w-[28rem] rounded-[24px] p-8 text-base lg:max-h-[480px] \${theme === "light" ? "bg-base-light bg-light-linear-gradient text-blue-700" : "bg-base-dark bg-dark-linear-gradient text-grey-50"}\`}
        >
          <div className="relative flex w-full flex-col gap-[18px] md:gap-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold lg:text-2xl">{t("settings")}</h3>

              <button
                onClick={() => {
                  settingsPopover.current?.close();
                }}
                className={\`w-fit rounded-full p-1 \${theme === "light" ? "" : "bg-grey-800"}\`}
              >
                <X />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <LanguageSelector selectedLocale={selectedLocale} theme={theme} />
              <ExplorerOptions
                explorer={explorer}
                filledStyle={filledStyle}
                outlinedStyle={outlinedStyle}
                theme={theme}
                setExplorer={setExplorer}
              />
              <DarkModeToggle
                enabled={enabled}
                setEnabled={setEnabled}
                theme={theme}
              />
            </div>
            <div className="flex items-center justify-start gap-6">
              {["twitter", "discord", "telegram"].map((platform) => (
                <a
                  key={platform}
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="h-auto w-[24px]">
                    <Image
                      src={\`/\${platform}.svg\`}
                      alt={\`\${platform} icon\`}
                      width={100}
                      height={100}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

const ExplorerOptions = ({
  theme,
  filledStyle,
  outlinedStyle,
  explorer,
  setExplorer,
}: {
  theme: "dark" | "light";
  filledStyle: string;
  outlinedStyle: string;
  explorer: string;
  setExplorer: Dispatch<SetStateAction<string>>;
}) => (
  <div
    className={\`flex min-h-[4.5rem] items-center justify-between rounded-[8px] border p-4 \${theme === "light" ? "border-grey-300 bg-grey-10" : "border-grey-700 bg-grey-600"}\`}
  >
    <p>Explorer</p>
    <div className="relative flex gap-2">
      <button
        onClick={() => setExplorer("voyager")}
        className={\`w-fit min-w-24 rounded-[8px] border p-[0.35rem] \${explorer === "voyager" ? filledStyle : outlinedStyle}\`}
      >
        Voyager
      </button>
      <button
        onClick={() => setExplorer("starkscan")}
        className={\`w-fit min-w-24 rounded-[8px] border p-[0.35rem] \${explorer === "starkscan" ? filledStyle : outlinedStyle}\`}
      >
        Starkscan
      </button>
    </div>
  </div>
);

const DarkModeToggle = ({
  enabled,
  setEnabled,
  theme,
}: {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  theme: string;
}) => (
  <div
    className={\`flex min-h-[4.5rem] items-center justify-between rounded-[8px] border p-4 \${theme === "light" ? "border-grey-300 bg-grey-10" : "border-grey-700 bg-grey-600"}\`}
  >
    <p>Dark Mode</p>
    <div
      onClick={() => setEnabled(!enabled)}
      className={\`flex h-7 w-12 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 \${enabled ? "bg-grey-50" : "border-[2px] border-black bg-transparent"}\`}
    >
      <div
        className={\`h-4 w-4 transform rounded-full shadow-md transition-transform duration-300 \${enabled ? "translate-x-6 bg-grey-600" : "translate-x-0 bg-black"}\`}
      />
    </div>
  </div>
);

const LanguageSelector = ({
  selectedLocale,

  theme,
}: {
  selectedLocale: string;

  theme: string;
}) => {
  const { t, updateLocale } = useTranslation();
  const handleChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale: Locale = e.target.value as Locale;
    updateLocale(newLocale);
  };
  return (
    <div
      className={\`flex min-h-[4.5rem] items-center justify-between rounded-[8px] border p-4 \${theme === "light" ? "border-grey-300 bg-grey-10" : "border-grey-700 bg-grey-600"}\`}
    >
      <p className="basis-1/2">{t("language")}</p>
      <div className="relative max-w-[8rem] flex-1">
        <ChevronDown
          className="absolute right-[0.5rem] top-1/2 -translate-y-1/2"
          size={18}
        />
        <label htmlFor="language" className="inline-block w-full">
          <select
            id="language"
            name="language"
            value={selectedLocale}
            className={\`w-full appearance-none rounded-[8px] p-2 focus:outline-none \${theme === "light" ? "bg-grey-300" : "bg-grey-700 text-white"}\`}
            onChange={handleChangeLang}
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
  );
};
`;
