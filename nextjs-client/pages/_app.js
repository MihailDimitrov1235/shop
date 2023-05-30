import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@/components/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { appWithTranslation } from 'next-i18next';
import MainLayout from '@/components/MainLayout';
import ControlPanelLayout from '@/components/ControlPanel/ControlPanelLayout';
import { useRouter } from 'next/router';
import AuthProvider from '@/providers/AuthProvider';
import MessageProvider from '@/providers/MessageProvider';
import 'react-quill/dist/quill.snow.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const router = useRouter()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <GlobalStyles />
        <AuthProvider>
          <MessageProvider>
            {router.asPath.includes('/admin') ?
              <ControlPanelLayout>
                <Component {...pageProps} />
              </ControlPanelLayout>
              :
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            }
          </MessageProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default appWithTranslation(MyApp)