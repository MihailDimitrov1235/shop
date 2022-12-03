import { useState } from "react";
import { ProSidebar , Menu, MenuItem} from 'react-pro-sidebar';
//import 'react-pro-sidebar/dist/styles';
import { Box, IconButton, Typography, useTheme } from "@mui/system";
import { Link } from "react-router-dom";

const SideBar = () =>{
    const theme = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');

    return (
        <Box>
            
        </Box>
    )
}

export default SideBar;