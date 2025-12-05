//--------------------------------------------------

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './languages/en.json';
import no from './languages/no.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANG_KEY = 'app_language';

// Load stored language from AsyncStorage
async function getStoredLanguage() {
  try {
    const storedLang = await AsyncStorage.getItem(LANG_KEY);
    return storedLang || null;
  } catch {
    return null;
  }
}

export const setupI18n = async () => {
  const fallbackLang = 'en';
  const storedLang = await getStoredLanguage();

  const initialLang = storedLang ||  fallbackLang;

  await i18n.use(initReactI18next).init({
    lng: initialLang,
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      no: { translation: no },
    },
    //allow html content in translation 
    interpolation: { escapeValue: false },
  });

  return i18n;
};

export const changeAppLanguage = async (lang: 'en' | 'no') => {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANG_KEY, lang);
};

export default i18n;
