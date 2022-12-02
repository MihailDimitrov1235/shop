import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider  } from '@mui/material';
// import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';

function App() {

  const content = useRoutes(routes);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        {content}
      </ThemeProvider>
    </div>
  );
}

export default App;
