import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Logo from '../Logo';
import NavItem from './NavItem';

const Navbar = (props) => (
  <AppBar
    elevation={0}
    sx={{ py: 1 }}
    {...props}
  >
    <Toolbar sx={{ height: 64, display: 'flex', justifyContent: 'space-around' }}>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <Box sx={{  display: 'flex', width: '20%', justifyContent: 'space-between'  }}>
        <NavItem
          title="Начало"
          href="/"
        />
        <NavItem
          title="Продукти"
          href="/products"
        />
        <NavItem
          title="Вход"
          href="/login"
          variant="contained"
          color="bordoRed"
          textcolor="text.white"
        />
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;