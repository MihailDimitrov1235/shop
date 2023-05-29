import { useState, useEffect } from 'react';
import {
    Box,
    Divider,
    IconButton,
    Drawer,
    ListItem
} from '@mui/material';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from "@mui/icons-material/Close";
import NavbarContent from './NavbarContent';

const HamburgerMenu = ({ items }) => {
    const [open, setOpen] = useState(false);
    const location = useRouter();

    useEffect(() => {
        setOpen(false);
    }, [location.pathname])

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
    };

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
            >

                <Box
                    sx={{
                        p: 2,
                        height: 1
                    }}
                >
                    <IconButton
                        sx={{ mb: 2 }}
                        onClick={toggleDrawer(false)}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Divider sx={{ mb: 2 }} />

                    {items.map((item, index) => {
                        if (item.type === 'divider') {
                            return <Divider sx={{ mb: 2 }} key={index} />;
                        } else {
                            return (
                                <ListItem sx={{ justifyContent: 'center' }} key={index}>
                                    <NavbarContent item={item} />
                                </ListItem>
                            );
                        }
                    })}
                </Box>
            </Drawer>
        </Box>
    );
};

export default HamburgerMenu;