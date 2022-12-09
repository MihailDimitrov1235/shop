import {Box, IconButton, AppBar} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { width } from "@mui/system";
import LanguageSwitcher from "../../Navbar/LanguageSwitcher";

function TopBar (){
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            backgroundColor: `${theme.palette.background.paper}`,
            borderBottom: `1px solid ${theme.palette.primary.border}`
        }}>

            {/* Search */}
            <Box sx={{
                display: 'flex',
                borderRadius: '3px'
            }}>
                <InputBase
                    sx={{
                        px: 1, 
                        ml: 2,
                        flex: 1,
                        backgroundColor: theme.palette.background.paper,
                        border: `2px solid ${theme.palette.primary.contrastText}`, 
                        borderRadius: '50vh' 
                    }}
                    placeholder="Search" 
                />
                <IconButton>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* Icons */}
            <Box display="flex">
                <LanguageSwitcher />
                <IconButton sx={{ml: 'auto'}}>
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