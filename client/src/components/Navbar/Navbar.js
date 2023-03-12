import { Link as RouterLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Badge
} from '@mui/material';
import Logo from '../Logo';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import HamburgerMenu from './HamburgerMenu';
import useAuth from '../../hooks/useAuth';
import NavbarContent from './NavbarContent';

const Navbar = (props) => {
    const { t } = useTranslation();
    const { user } = useAuth();

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

    const items = [
        { type: 'link', title: t('home'), href: '/'},
        { type: 'link', title: t('products'), href: '/products' },
        { type: 'langSwitcher' },
        { type: 'divider', orientation: 'vertical' },
        {
            type: 'link',
            title: <StyledBadge badgeContent={4} color="bordoRed">
                <span>{t('cart')}</span>
            </StyledBadge>,
            href: '/cart',
            variant: "outlined",
            color: "bordoRed",
            textcolor: "bordoRed",
            paddingx: 4.5,
            startIcon: <ShoppingCartIcon />
        }
    ]

    if (user) {
        items.push({ type: 'profile' })
    } else {
        items.push({
            type: 'link',
            title: t('sign-in'),
            href: '/login',
            variant: 'contained',
            color: 'bordoRed',
            textcolor: "text.white",
            marginx: 0
        })
    }

    return (
        <AppBar
            elevation={0}
            sx={{ py: 1 }}
            {...props}
        >
            <Toolbar sx={{ height: 64, display: 'flex', justifyContent: 'space-between', width: { sm: '100%', md: '85%' }, margin: { sm: 'none', md: '0 auto' } }}>
                <RouterLink to="/">
                    <Logo />
                </RouterLink>
                <Box sx={{ justifyContent: 'space-between', display: { xs: 'none', md: 'flex' } }}>
                    {items.map((item, index) => (
                        <NavbarContent item={item} key={index} />
                    ))}
                </Box>

                <HamburgerMenu items={items} />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;