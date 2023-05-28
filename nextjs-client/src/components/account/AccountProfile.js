// import moment from 'moment';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

import HomeIcon from '@mui/icons-material/Home';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import SettingsIcon from '@mui/icons-material/Settings';

const AccountProfile = ({ menu, setMenu, ...props }) => {
    const { user } = useAuth();
    const { t } = useTranslation();

    const handleMenuClick = (m) => {
        setMenu(m);
    }

    const menus = [
        { title: t('home'), slug: 'home', icon: HomeIcon },
        { title: t('purchases'), slug: 'purchases', icon: ShopTwoIcon },
        { title: t('settings'), slug: 'settings', icon: SettingsIcon }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Card {...props} sx={{ height: '260px' }}>
                <CardContent>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Avatar
                            src={user && Object.hasOwn(user, 'avatar') ? user.avatar : ''}
                            sx={{
                                height: 100,
                                width: 100
                            }}
                        />
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                            {user && user.name}
                        </Typography>
                        {/* <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        {`${user.city} ${user.country}`}
                    </Typography> */}
                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            {/* {`${moment().format('hh:mm A')} ${user.timezone}`} */}
                        </Typography>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="bordoRed"
                        fullWidth
                        variant="text"
                    >
                        {t('upload-picture')}
                    </Button>
                </CardActions>
            </Card>
            <Card sx={{ height: '50%' }}>
                <MenuList>
                    {menus.map((m, index) => {
                        const { icon: Icon } = m;
                        const isActive = menu === m.slug;

                        return (
                            <MenuItem onClick={() => handleMenuClick(m.slug)} sx={{ py: 1 }}>
                                <ListItemIcon>
                                    <Icon color={isActive ? 'bordoRed' : 'action'} />
                                </ListItemIcon>
                                <ListItemText sx={{ color: isActive && 'text.bordoRed' }}>{m.title}</ListItemText>
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Card>
        </Box>
    );
}

export default AccountProfile;