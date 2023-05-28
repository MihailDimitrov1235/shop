import { dir } from 'i18next'
import { languages } from '../i18n/settings'

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params: {
    locale
  }
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <head />
      <body style={{ textAlign: 'left'}}>
        {children}
      </body>
    </html>
  )
}
