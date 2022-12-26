import {Box, IconButton} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LanguageSwitcher from "../../Navbar/LanguageSwitcher";
import ProfileItem from "../../Navbar/ProfileItem";

function TopBar (){
    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            py: 1,
            px: 3,
            backgroundColor: `${theme.palette.background.paper}`,
            borderBottom: `1px solid ${theme.palette.primary.border}`
        }}>
            {/* Icons */}
            <Box display="flex">
                <LanguageSwitcher />
                <ProfileItem />
                {/* <IconButton sx={{ml: 'auto'}}>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlineOutlinedIcon />
                </IconButton> */}
            </Box>
        </Box>
        )
}

export default TopBar;