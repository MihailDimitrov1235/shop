import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import AuthProvider from './providers/AuthProvider';
import MessageProvider from './providers/MessageProvider';
import './App.css';

function App() {
  const content = useRoutes(routes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <MessageProvider>
            {content}
          </MessageProvider>
        </AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
