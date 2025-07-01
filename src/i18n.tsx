// src/i18n.js

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

// Import translation files
import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';

// Define translation resources
const resources = {
  en: {translation: en},
  ar: {translation: ar},
};

// Fallback language if no match found
const fallbackLng = 'en';

// Get device's preferred locales
const locales = RNLocalize.getLocales();

// Extract first preferred locale
const deviceLocale = locales.length > 0 ? locales[1].languageCode : fallbackLng;

// Use the language if it's available in your translations
const selectedLanguage = Object.keys(resources).includes(deviceLocale)
  ? deviceLocale
  : fallbackLng;

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  lng: selectedLanguage,
  fallbackLng,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false, // React already protects from XSS
  },
});

export default i18n;
