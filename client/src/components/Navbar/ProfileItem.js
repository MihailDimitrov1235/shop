import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Typography,
    ListItemIcon
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import userService from '../../services/user';
import useAuth from '../../hooks/useAuth';

const ProfileItem = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { t } = useTranslation();
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const items = [
        { type: 'link', title: t('account'), href: '/account', icon: PersonIcon },
        { type: 'link', title: t('dashboard'), href: '/admin', icon: DashboardIcon },
        { type: 'button', title: t('logout'), href: '/logout', icon: LogoutIcon, handler: () => {
            userService.logout()
            .then((res) => {
                setUser(null);
                localStorage.removeItem('refresh-token');
                navigate('/', { replace: true });
            })
            .catch((err) => {
                if(err.message === 'Unauthorized') {
                    setUser(null);
                    localStorage.removeItem('refresh-token');
                    navigate('/login');
                }
            })
        }}
    ];

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
                {items.map((item, index) => {
                    const {
                        type,
                        title,
                        href,
                        icon: Icon
                    } = item;
                    
                    return (
                        <MenuItem
                            component={RouterLink}
                            {...(type === 'button' ? { onClick: (e) => {
                                e.preventDefault();
                                item.handler();
                            }} : {} )}
                            to={href}
                            sx={{ width: '100%' }}
                            key={index}
                        >
                            <ListItemIcon>
                                <Icon fontSize="small"/>
                            </ListItemIcon>
                            <Typography textAlign='center'>
                                {title}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </Menu>
        </Box>
    );
}

export default ProfileItem;