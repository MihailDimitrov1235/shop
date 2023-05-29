// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend';
// //import LanguageDetector from 'i18next-browser-languagedetector';

// const fallbackLng = ['bg'];
// const availableLanguages = ['en', 'bg'];

// i18n
//   .use(Backend) // load translations using http (default public/assets/locals/en/translations)
//   //.use(LanguageDetector) // detect user language
//   .use(initReactI18next) // pass the i18n instance to react-i18next.
//   .init({
//     fallbackLng, // fallback language is english.

//     detection: {
//       checkWhitelist: true, // options for language detection
//     },

//     debug: false,

//     whitelist: availableLanguages,

//     interpolation: {
//       escapeValue: false, // no need for react. it escapes by default
//     },
//     react: {
//       useSuspense: false,  // << ----- this line
//     },
//   });

// export default i18n;

module.exports={
  webpack(config) {
    config.infrastructureLogging = { debug: /PackFileCache/ }
    return config;
  },
  i18n: {
    locales: ['en', 'bg'],
    defaultLocale: 'bg',
  }
}