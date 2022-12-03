import { useState } from "react";
import { ProSidebarProvider , Menu, MenuItem} from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/styles';
import { Box, useTheme } from "@mui/system";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { IconButton } from "@mui/material";

const SideBar = () =>{
    const theme = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');

    return (
        <Box sx={{
            backgroundColor:`${theme.palette.background.adminMenu}`,
            width:"200px",
        }}>
            <ProSidebarProvider>
                <Menu>
                    {!isCollapsed &&(
                        <MenuItem>
                            <Box textAlign="center">
                                <Typography variant='h5'>
                                    ADMINS
                                </Typography>
                                <IconButton>
                                    <AdminPanelSettingsIcon />
                                </IconButton>
                            </Box>
                        </MenuItem>
                    )}
                </Menu>
            </ProSidebarProvider>
        </Box>
    )
}

export default SideBar;