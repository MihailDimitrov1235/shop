import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@/components/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { appWithTranslation } from 'next-i18next';
import MainLayout from '@/components/MainLayout';
import ControlPanelLayout from '@/components/ControlPanel/ControlPanelLayout';
import { useRouter } from 'next/router';
// import Router from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import AuthProvider from '@/providers/AuthProvider';
import MessageProvider from '@/providers/MessageProvider';
import PageLayout from "@/components/ControlPanel/PageLayout";
import 'react-quill/dist/quill.snow.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  // const [loading, setLoading] = React.useState(false)
  // const LoadingContext = React.createContext()
  const router = useRouter()
  // Router.events.on("routeChangeStart", (url) => {
  //   setLoading(true)
  // })
  // Router.events.on("routeChangeComplete", (url) => {
  //   setLoading(false)
  // })
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <GlobalStyles />
          <AuthProvider>
            <MessageProvider>
              <NextNProgress color="#96011c" height={4} showOnShallow={true} />
              {/* <LoadingContext.Provider value={loading}> */}
                {router.pathname.includes('/admin') ?
                  <ControlPanelLayout>
                    <PageLayout>
                    <Component {...pageProps} />
                    </PageLayout>
                  </ControlPanelLayout>
                  :
                  router.pathname === '/404'?
                    <Component {...pageProps} />
                    :
                    <MainLayout>
                      <Component {...pageProps} />
                    </MainLayout>
                }
              {/* </LoadingContext.Provider> */}
            </MessageProvider>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default appWithTranslation(MyApp)