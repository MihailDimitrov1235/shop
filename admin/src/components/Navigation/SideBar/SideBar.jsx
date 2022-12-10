import { useState } from "react";
import React, { Component } from "react";
import MenuItemText from './MenuItemText';
import { Sidebar, useProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/styles';
import { Box, useTheme } from "@mui/material";
import Typography from '@mui/material/Typography';
import MenuButton from "./MenuButton";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ComputerIcon from '@mui/icons-material/Computer';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const SideBar = () => {
    const [selected, setSelected] = useState("Dashboard");
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
            <Sidebar backgroundColor={theme.palette.background.paper} width="250px">
            <Box height="auto" pl="18px" pr="auto" backgroundColor={theme.palette.primary.contrastText}>
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

                <MenuItem onClick={() => setSelected("Dashboard")} active={ selected === "Dashboard" } disabled={ selected === "Dashboard" } routerLink={<Link to={'/dashboard'}/>} icon={<DashboardIcon/>} > Dashboard </MenuItem>
                {/* <MenuItemText>Client Facing</MenuItemText> */}
                <SubMenu label="Client Facing" icon={<ComputerIcon/>} style={{paddingLeft:"20px"}} >
                    <MenuButton selected={selected} setSelected={setSelected} name={"Products"} to={'/products'} />
                    <MenuButton selected={selected} setSelected={setSelected} name={"Users"} to={'/users'} />
                    <MenuButton selected={selected} setSelected={setSelected} name={"Transactions"} to={'/transactions'} />
                </SubMenu>
                {/* <MenuItemText>Sales</MenuItemText> */}
                <SubMenu label="Sales" icon={<ShoppingBagIcon/>} >
                    <MenuItem routerLink={<Link to={'/products'}/>}> Overview </MenuItem>
                    <MenuItem routerLink={<Link to={'/products'}/>}> Daily </MenuItem>
                    <MenuItem routerLink={<Link to={'/products'}/>}> Monthly </MenuItem>
                    <MenuItem routerLink={<Link to={'/products'}/>}> Breakdown </MenuItem>
                </SubMenu>
                {/* <MenuItemText>Management</MenuItemText> */}
                <SubMenu label="Management" icon={<ManageAccountsIcon/>} >
                    <MenuItem routerLink={<Link to={'/admins'}/>}> Admins </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
        </Box>
    );

}

export default SideBar;
