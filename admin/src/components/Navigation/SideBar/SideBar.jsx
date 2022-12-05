import { useState } from "react";
import React, { Component } from "react";
import { Sidebar,useProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/styles';
import { Box, useTheme } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ReactRoundedImage from "react-rounded-image";

import MenuIcon from '@mui/icons-material/Menu';

import DashboardIcon from '@mui/icons-material/Dashboard';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const SideBar = () =>{
    const theme = useTheme();
    const { collapseSidebar } = useProSidebar();
    const hoverStyle = {
        backgroundColor:`${theme.palette.background.adminMenu}`,
        color:`${theme.palette.primary.main}`,
    }

    return (
        <Box sx={{
            display:'flex',
            height:'100%',
        }}>
            <Sidebar backgroundColor={theme.palette.background.adminMenu} width="300px">
                <Box height="auto" pl="15px" pr="auto" backgroundColor={theme.palette.background.adminMenuDarker}>
                    <IconButton onClick={() => collapseSidebar()}>
                        <MenuIcon/>
                    </IconButton>
                </Box>
                <Menu menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        // only apply styles on first level elements of the tree
                        return {
                            color: disabled ? `${theme.palette.primary.main}` : `${theme.palette.primary.mainDarker}`,
                            //backgroundColor: active ? '#eecef9' : undefined,
                            backgroundColor: `${theme.palette.background.adminMenu}`,
                            ":hover":hoverStyle,
                        };
                    },
                }}>
                    <MenuItem active='true' disabled='false' icon=<DashboardIcon/> > Dashboard </MenuItem>
                    <SubMenu label="Accounts" icon=<ManageAccountsIcon/> >
                        <MenuItem> Users </MenuItem>
                        <MenuItem> Admins </MenuItem> 
                    </SubMenu>
                    <SubMenu label="Projects" icon=<ShoppingBagIcon/> >
                        <MenuItem> Add Project </MenuItem>
                        <MenuItem> View Projects </MenuItem>
                    </SubMenu>
                    <MenuItem icon=<CalendarMonthIcon/> > Calendar </MenuItem>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default SideBar;
