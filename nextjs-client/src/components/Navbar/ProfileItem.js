import { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Tooltip,
    Divider,
    Avatar,
    Menu,
    MenuItem,
    Typography,
    ListItemIcon,
    Button
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';
import userService from '../../services/user';
import useAuth from '../../hooks/useAuth';
import Link from 'next/link';

const ProfileItem = () => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { t } = useTranslation();
    const { user, setUser } = useAuth();
    const location = useRouter();
    const isInAdmin = ([`/admin`].includes(location.pathname))

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const items = [
        { type: 'link', title: t('account'), href: isInAdmin ? '/admin/account' : '/account', icon: PersonIcon },
        { type: 'divider' },
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

    if(user && user.role_id === 1) {
        if(isInAdmin) {
            items.splice(1, 0, { type: 'link', title: t('store'), href: '/', icon: StoreIcon });
        }else {
            items.splice(1, 0, { type: 'link', title: t('dashboard'), href: '/admin', icon: DashboardIcon });
        }
    }

    return (
        <Box>
            <Tooltip title={t('profile')}>
                <Button variant='text' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="AuthorImage" />
                    <Typography variant='span' component='span' sx={{ ml: 1 }}>{user && user.name}</Typography>
                </Button>
            </Tooltip>
            <Menu
                sx={{ mt: '50px' }}
                anchorEl={anchorElUser}
                PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
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

                    if(type === 'divider') {
                        return <Divider key={index} />
                    }
                    
                    return (
                        <MenuItem
                            component={Link}
                            {...(type === 'button' ? { onClick: (e) => {
                                e.preventDefault();
                                item.handler();
                            }} : { onClick: handleCloseUserMenu } )}
                            href={href}
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