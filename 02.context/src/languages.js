import { createContext } from 'react';

export const LANGUAGES = {
  EN: 'EN',
  RU: 'RU',
}

const TRANSLATIONS = {
  EN: {
    toggleTheme: 'Toggle theme',
    toggleLanguage: 'Toggle language',
  },
  RU: {
    toggleTheme: 'Переключить тему',
    toggleLanguage: 'Переключить язык',
  }
}

export const LanguageContext = createContext({
  language: LANGUAGES.EN,
  toggleLanguage: () => {},
})

export default (key, language) => TRANSLATIONS[language][key]