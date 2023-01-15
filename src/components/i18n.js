import i18n from "i18next";
import HttpAPI from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpAPI)
  .init({
    backend: {
      loadPath: "locales/{{lng}}/translation.json",
    },
    fallbackLng: "en",
    supportedLngs: ["en", "np"],
    detection: {
      order: [
        "localStorage",
        "htmlTag",
        "cookie",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage"],
    },
    ns: ["landing", "login", "signup"],
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
    debug: false,
  });

export default i18n;
