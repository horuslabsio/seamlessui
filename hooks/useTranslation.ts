import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"; // For reading and setting cookies

type Locale = "en" | "fr" | "sp"; // Define your supported locales

// Function to detect locale from cookies
const detectLocaleFromCookies = (cookies: Record<string, string>): Locale => {
  const supportedLocales: Locale[] = ["en", "fr", "sp"];
  const localeFromCookies = cookies["locale"]; // Assuming the cookie name is 'locale'

  if (
    localeFromCookies &&
    supportedLocales.includes(localeFromCookies as Locale)
  ) {
    return localeFromCookies as Locale;
  }

  return "en"; // Fallback to English if no valid locale is found in cookies
};

// Modified useTranslation hook with cookie-based locale detection and update
export const useTranslation = () => {
  const [cookies, setCookie] = useCookies(["locale"]); // Hook to read and set cookies
  const [locale, setLocale] = useState<Locale>("en");
  const [dictionary, setDictionary] = useState<Record<string, string>>({});

  useEffect(() => {
    const detectedLocale = detectLocaleFromCookies(cookies);
    setLocale(detectedLocale);

    const fetchDictionary = async () => {
      const dict = await import(`@/i18n/locales/${detectedLocale}.json`);
      setDictionary(dict.default);
    };

    fetchDictionary();
  }, [cookies]);

  // Function to update the locale
  const updateLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setCookie("locale", newLocale, { path: "/", maxAge: 30 * 24 * 60 * 60 }); // Cookie valid for 30 days
  };

  return {
    t: (key: string) => dictionary[key] || key,
    locale,
    updateLocale, // Return the function to update the locale
  };
};
