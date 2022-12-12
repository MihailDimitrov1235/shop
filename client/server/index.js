import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import App from '../src/App';
import { StaticRouter } from 'react-router-dom/server';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18nextConf';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-http-backend';

const app = express()
const port = 3000
const cdnHost = `http://localhost:4000`; // [D]
const path = require('path')

i18n
    //.use(i18nextMiddleware.LanguageDetector)
    .use(Backend).init({
        lng: "bg",
        fallbackLng: "bg",
        lowerCaseLng: true,
        preload: ["bg", "en"],
        backend: {
            //loadPath: `${path.resolve(__dirname, '../client/public/locales')}/{{lng}}/{{ns}}.json`,
            loadPath: `${cdnHost}/public/locales/{{lng}}/{{ns}}.json`
        },
        useCookie: false
    });


app.use(express.static(path.resolve(__dirname, '../client/public')))
app.use(
    i18nextMiddleware.handle(i18n, {
        removeLngFromUrl: false
    })
);
app.use('/locales', express.static(path.resolve(__dirname, '../client/public/locales')));

app.get('*', (req, res) => {
    let jsx = ReactDOMServer.renderToString(
        <I18nextProvider i18n={req.i18n}>
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        </I18nextProvider>
    ) // [A]

    const initialI18nStore = {};
    req.i18n.languages.forEach(l => {
        initialI18nStore[l] = req.i18n.services.resourceStore.data[l];
    });
    const initialLanguage = req.i18n.options.lng;

    const clientBundleStyle = `<link rel="stylesheet" href="${cdnHost}/styles/bundle.css">` // [B]
    const clientBundleScript = `<script src="${cdnHost}/scripts/bundle.js"></script>` // [C]

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
            <script>
                window.initialI18nStore = "${JSON.stringify(initialI18nStore)}";
                window.initialLanguage = "${initialLanguage.slice(0, 2)}";
            </script>
            <meta charset="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta
              name="description"
              content="Web site created using create-react-app"
            />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            
            <title>React App</title>
                ${clientBundleStyle} <!-- [B] -->
            </head>
            <body>
                <div id='root'>${jsx}</div> <!-- [A] -->
                ${clientBundleScript} <!-- [C] -->
            </body>
        </html>
    `)
})

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})