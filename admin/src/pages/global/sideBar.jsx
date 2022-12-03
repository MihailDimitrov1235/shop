import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/styles';
import { Box, useTheme } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { IconButton } from "@mui/material";

const SideBar = () =>{
    const theme = useTheme();

    return (
        <Box sx={{
            height:'100%',
            width:'300px',

        }}>
            <Menu>
                <SubMenu label="People" >
                    <MenuItem> Users </MenuItem>
                    <MenuItem> Admins </MenuItem> 
                </SubMenu>
                <SubMenu label="Projects">
                    <MenuItem> Add Project </MenuItem>
                    <MenuItem> View Projects </MenuItem>
                </SubMenu>
                <MenuItem> Calendar </MenuItem>
            </Menu>
        </Box>
    )
}

export default SideBar;