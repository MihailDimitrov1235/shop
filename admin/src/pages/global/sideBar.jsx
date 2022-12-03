import { useState } from "react";
import { Sidebar,useProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/styles';
import { Box, useTheme } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const SideBar = () =>{
    const theme = useTheme();
    const { collapseSidebar } = useProSidebar();

    return (
        <Box sx={{
            display:'flex',
            height:'100%',

        }}>
            <Sidebar>
                <Menu>
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

            <main>
                <button onClick={() => collapseSidebar()}>Collapse</button>
            </main>
        </Box>
    )
}

export default SideBar;