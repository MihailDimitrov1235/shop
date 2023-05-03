import React from "react";
import { Sidebar, useProSidebar, Menu } from 'react-pro-sidebar';
import { Box, useTheme, IconButton } from "@mui/material";
import SideBarContent from "./SideBarContent";
import { useTranslation } from 'react-i18next';

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
    };
    const { t } = useTranslation();

    const items = [
        { type: 'item', icon: DashboardIcon, label: t('dashboard'), href: '/admin/dashboard' },
        { type: 'subMenu', icon: ComputerIcon, label: t('client-facing'), items: [
            { type: 'item', icon: null, href: '/admin/categories', label: t('categories') },
            { type: 'item', icon: null, href: '/admin/products', label: t('products') },
            { type: 'item', icon: null, href: '/admin/transactions', label: t('transactions') },
        ]},
        { type: 'subMenu', icon: ShoppingBagIcon, label: t('sales'), items: [
            { type: 'item', icon: null, href: '/products', label: 'Overview' },
            { type: 'item', icon: null, href: '/products', label: 'Daily' },
            { type: 'item', icon: null, href: '/products', label: 'Monthly' },
            { type: 'item', icon: null, href: '/products', label: 'Breakdown' },
        ]},
        { type: 'subMenu', icon: ManageAccountsIcon, label: t('management'), items: [
            { type: 'item', icon: null, href: '/admin/admins', label: t('admins') },
            { type: 'item', icon: null, href: '/admin/users', label: t('users') },
            { type: 'item', icon: null, href: '/admin/authors', label: t('authors') },
            { type: 'item', icon: null, href: '/admin/requests', label: t('requests') },
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
                    subMenuContent:()=>{
                        return{
                            overflow:'visible'
                        }
                    },
                    button: ({ level, active, disabled }) => {
                        // only apply styles on first level elements of the tree

                        return {
                            color: active ? `${theme.palette.primary.contrastText}` : `${theme.palette.primary.mainDarker}`,
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