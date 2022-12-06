import { useState } from "react";
import React, { Component } from "react";
import MenuItemText from './MenuItemText';
import { Sidebar, useProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/styles';
import { Box, typography, useTheme } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ReactRoundedImage from "react-rounded-image";

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

    return (
        <Box sx={{
            display: 'flex',
            height: '100%',
        }}>
            <Sidebar backgroundColor={theme.palette.background.paper} width="300px">
            <Box height="auto" pl="15px" pr="auto" backgroundColor={theme.palette.primary.contrastText}>
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
                        ":hover":hoverStyle,
                    };
                },
            }}>

                <MenuItem active={true} disabled={true} icon={<DashboardIcon/>} > Dashboard </MenuItem>
                {/* <MenuItemText>Client Facing</MenuItemText> */}
                <SubMenu label="Client Facing" icon={<ComputerIcon/>} >
                    <MenuItem> Products </MenuItem>
                    <MenuItem> Users </MenuItem> 
                    <MenuItem> Transactions </MenuItem> 
                </SubMenu>
                {/* <MenuItemText>Sales</MenuItemText> */}
                <SubMenu label="Sales" icon={<ShoppingBagIcon/>} >
                    <MenuItem> Overview </MenuItem>
                    <MenuItem> Daily </MenuItem>
                    <MenuItem> Monthly </MenuItem>
                    <MenuItem> Breakdown </MenuItem>
                </SubMenu>
                {/* <MenuItemText>Management</MenuItemText> */}
                <SubMenu label="Management" icon={<ManageAccountsIcon/>} >
                    <MenuItem> Admins </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
        </Box>
    );

}

export default SideBar;
