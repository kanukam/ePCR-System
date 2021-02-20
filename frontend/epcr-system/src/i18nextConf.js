import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";

const fallbackLng = ["en"];
const availableLanguages = ["en", "es"];

const resources = {
    en: {
      translation: translationEN
    },
    es: {
      translation: translationES
    }
};

i18n
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng,

    detection: {
    checkWhitelist: true
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;