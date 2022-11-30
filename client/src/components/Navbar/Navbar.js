import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, Divider, Badge } from '@mui/material';
import Logo from '../Logo';
import NavItem from './NavItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';

const Navbar = (props) => {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            position: 'relative',
            width: '28px',
            height: '28px',
            borderRadius: '28px',
            right: 6,
            top: 14,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (
        <AppBar
            elevation={0}
            sx={{ py: 1 }}
            {...props}
        >
            <Toolbar sx={{ height: 64, display: 'flex', justifyContent: 'space-between', mx: '300px' }}>
                <RouterLink to="/">
                    <Logo />
                </RouterLink>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <NavItem
                        title="Начало"
                        href="/"
                    />
                    <NavItem
                        title="Продукти"
                        href="/products"
                    />
                    <Divider orientation="vertical" flexItem />
                    <NavItem
                        title={
                            <StyledBadge badgeContent={4} color="bordoRed">
                                <span>Количка</span>
                            </StyledBadge>
                        }
                        href="/cart"
                        variant="outlined"
                        color="bordoRed"
                        textcolor="bordoRed"
                        paddingx={4.5}
                        startIcon={<ShoppingCartIcon />}
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
};

export default Navbar;