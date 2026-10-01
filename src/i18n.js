import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import arCommon from './locales/ar/common.json';
import enCommon from './locales/en/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { common: arCommon },
      en: { common: enCommon },
    },
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'ar',
    supportedLngs: ['ar', 'en'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
