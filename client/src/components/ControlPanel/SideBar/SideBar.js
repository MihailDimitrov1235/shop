import React from "react";
import { Sidebar, useProSidebar, Menu } from 'react-pro-sidebar';
import { Box, useTheme, IconButton } from "@mui/material";
import SideBarContent from "./SideBarContent";

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const SideBar = () => {
    const theme = useTheme();
    const { collapseSidebar } = useProSidebar();
    const hoverStyle = {
        backgroundColor: `${theme.palette.background.paper}`,
        color: `${theme.palette.primary.contrastText}`,
    }

    const items = [
        { type: 'item', icon: DashboardIcon, label: 'Dashboard' },
        { type: 'subMenu', icon: ComputerIcon, label: 'Client Facing', items: [
            { href: '/products', label: 'Products' },
            { href: '/products', label: 'Users' },
            { href: '/products', label: 'Transactions' },
        ]},
        { type: 'subMenu', icon: ShoppingBagIcon, label: 'Sales', items: [
            { href: '/products', label: 'Overview' },
            { href: '/products', label: 'Daily' },
            { href: '/products', label: 'Monthly' },
            { href: '/products', label: 'Breakdown' },
        ]},
        { type: 'subMenu', icon: ManageAccountsIcon, label: 'Management', items: [
            { href: '/products', label: 'Admins' },
        ]},

    ]

    return (
        <Box sx={{
            display: 'flex',
            height: '100%',
        }}>
            <Sidebar backgroundColor={theme.palette.background.paper} width="250px">
                <Box p={1} height="auto" pl="18px" pr="auto" backgroundColor={theme.palette.primary.contrastText}>
                    <IconButton onClick={() => collapseSidebar()}>
                        <MenuIcon sx={{ color: theme.palette.primary.main }} />
                    </IconButton>
                </Box>
                <Menu menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        // only apply styles on first level elements of the tree
                        return {
                            color: disabled ? `${theme.palette.primary.contrastText}` : `${theme.palette.primary.mainDarker}`,
                            //backgroundColor: active ? '#eecef9' : undefined,
                            backgroundColor: `${theme.palette.background.paper}`,
                            ":hover": hoverStyle,
                        };
                    },
                }}>
                    <SideBarContent items={items}/>
                </Menu>
            </Sidebar>
        </Box>
    );

}

export default SideBar;