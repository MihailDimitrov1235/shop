import { Stack, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Success = () => {
    const { t } = useTranslation();

    return (
        <Stack justifyContent={'center'} alignItems={'center'} height='100vh'>
            <Typography variant='h3' sx={{ fontWeight: 'bold' }}>
                {t('success')}
            </Typography>
            <p>
                {t('success-info')}
            </p>
            <Button
                color='bordoRed'
                variant='contained'
                component={RouterLink}
                to='/'
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2 }}
            >
                {t('home')}
            </Button>
        </Stack>
    );
}

// We have received your payment. You can now access all the features in our app.

export default Success;