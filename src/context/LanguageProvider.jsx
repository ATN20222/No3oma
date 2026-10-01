import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from './LanguageContext';

export default function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggle = () => {
    i18n.changeLanguage(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}
