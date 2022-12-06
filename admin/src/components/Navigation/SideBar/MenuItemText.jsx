import { Typography } from '@mui/material';
import { MenuItem} from 'react-pro-sidebar';
import { useTheme } from "@mui/material";
const MenuItemText = ( { children } ) => {

    const theme = useTheme();
    return (
        <MenuItem
            disabled={true}
            style={{ marginTop: 10 }}
        >
            <Typography variant={'h5'} sx={{
                color:`${theme.palette.primary.mainDarker}`
            }}>
                {children}
            </Typography>
        </MenuItem>
    );
}

export default MenuItemText;