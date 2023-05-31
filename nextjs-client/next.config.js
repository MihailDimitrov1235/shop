const {i18n} = require('./next-i18next.config'); 

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n,
    env: {
        REACT_APP_API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
        REACT_APP_API_HEADER: process.env.REACT_APP_API_HEADER,
        REACT_APP_ASSETS: process.env.REACT_APP_ASSETS
    }
}

module.exports = nextConfig
