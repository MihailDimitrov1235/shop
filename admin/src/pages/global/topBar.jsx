import {Box, IconButton} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {useContext} from "react";
import InputBase from '@mui/material/InputBase';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';

function TopBar (){
    const theme = useTheme();
    return (
        <Box display="flex" justifyContent='space-between' p={2} height="40px" width="100%">

            {/* Search */}
            <Box display="flex" borderRadius="3px">
                <InputBase sx={{
                    p: 1, 
                    ml: 2,
                    flex: 1,
                    backgroundColor: theme.palette.background.paper,
                    border: `2px solid ${theme.palette.primary.contrastText}`, 
                    borderRadius: '50vh' 
                    }} placeholder="Search" />
                <IconButton>
                <SearchIcon />
                </IconButton>
            </Box>

            {/* Icons */}
            <Box display="flex">
                <IconButton sx={{ml: "auto"}}>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlineOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
        )
}

export default TopBar;