export const i18n = {
  defaultLocale: "en",
  locales: [
    {
      name: "English",
      symbol: "en",
    },
    {
      name: "Français",
      symbol: "fr",
    },

    {
      name: "Español",
      symbol: "sp",
    },
  ],
} as const;

export type Locale = (typeof i18n)["locales"][number]["symbol"];
