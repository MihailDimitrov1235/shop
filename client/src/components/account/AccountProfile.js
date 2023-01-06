// import moment from 'moment';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const AccountProfile = (props) => {
    const { user } = useAuth();
    const { t } = useTranslation();

    return (
        <Card {...props}>
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
                        variant="h3"
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
    );
}

export default AccountProfile;