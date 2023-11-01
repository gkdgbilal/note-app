import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "@/i18n/locales/en.json";
import trTranslation from "@/i18n/locales/tr.json";

i18n
  .use(initReactI18next) // react-i18next'i başlatın
  .init({
    resources: {
      en: {
        translation: enTranslation, // İngilizce çeviriler
      },
      tr: {
        translation: trTranslation, // Türkçe çeviriler
      },
    },
    lng: "tr", // Varsayılan dil
    fallbackLng: "tr", // Varsayılan dil
    interpolation: {
      escapeValue: false, // HTML etiketlerini kaçırmayın
    },
  });

export { i18n };
