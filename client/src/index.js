import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './i18nextConf';
import { useSSR } from "react-i18next";
import ScrollToTop from './components/ScrollToTop';

//for SSR

// const AppContainer = () => {
//   useSSR(window.initialI18nStore, window.initialLanguage);

//   return (
//     <Suspense fallback={<span>Loading...</span>}>
//       <React.StrictMode>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </React.StrictMode>
//     </Suspense>
//   );
// };

// ReactDOM.hydrateRoot(document.getElementById('root'),
//   <AppContainer />
// );


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
