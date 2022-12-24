import { useState } from 'react';
import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const pages = ['Account', 'Dashboard', 'Logout'];

const ProfileItem = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { t } = useTranslation();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box>
            <Tooltip title={t('profile')}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>{page}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}

export default ProfileItem;