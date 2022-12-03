import { useRoutes } from 'react-router-dom';
import { StyledEngineProvider  } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
// import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import TopBar from './pages/global/TopBar'
import SideBar from './pages/global/SideBar'
import {Box} from "@mui/material";

function App() {

  const content = useRoutes(routes);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <SideBar />
        <TopBar />
        {content}
      </ThemeProvider>
    </div>
  );
}

export default App;
