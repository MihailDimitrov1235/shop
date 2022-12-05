import { useRoutes } from 'react-router-dom';
import { StyledEngineProvider  } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
// import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import TopBar from './components/Navigation/TopBar'
import SideBar from './components/Navigation/SideBar/SideBar'
import {Box} from "@mui/material";
import { ProSidebarProvider } from 'react-pro-sidebar';

function App() {

  const content = useRoutes(routes);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <SideBar />
          </ProSidebarProvider>
          <div style={{width:"100%"}}>
          <TopBar />
          {content}
          </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
