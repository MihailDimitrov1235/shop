import { useState } from 'react';
import {
    Box,
    Divider,
    IconButton,
    Drawer,
    ListItem,
    Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from "@mui/icons-material/Close";
import NavItem from './NavItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { styled } from '@mui/material/styles';

const HamburgerMenu = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

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
        <Box sx={{ justifyContent: 'end', display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="right"
                variant="temporary"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >

                <Box
                    sx={{
                        p: 2,
                        height: 1
                    }}
                >
                    <IconButton sx={{ mb: 2 }}>
                        <CloseIcon onClick={toggleDrawer(false)} />
                    </IconButton>

                    <Divider sx={{ mb: 2 }} />

                    <ListItem>
                        <NavItem
                            title={t('home')}
                            href="/home"
                            marginx={0}
                        />
                    </ListItem>
                    <ListItem>
                        <NavItem
                            title={t('products')}
                            href="/products"
                        />
                    </ListItem>
                    <ListItem>
                        <LanguageSwitcher />
                    </ListItem>

                    <Divider sx={{ mb: 2 }} />

                    <ListItem>
                        <NavItem
                            title={
                                <StyledBadge badgeContent={4} color="bordoRed">
                                    <span>{t('cart')}</span>
                                </StyledBadge>
                            }
                            href="/cart"
                            variant="outlined"
                            color="bordoRed"
                            textcolor="bordoRed"
                            paddingx={4.5}
                            startIcon={<ShoppingCartIcon />}
                        />
                    </ListItem>
                    <ListItem>
                        <NavItem
                            title={t('sign-in')}
                            href="/login"
                            variant="contained"
                            color="bordoRed"
                            textcolor="text.white"
                        />
                    </ListItem>
                </Box>
            </Drawer>
        </Box>
    );
};

export default HamburgerMenu;