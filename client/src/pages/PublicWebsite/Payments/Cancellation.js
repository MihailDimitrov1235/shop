import { Box, Typography, Button } from '@mui/material';
import { Link as RouterLink  } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Cancellation = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'column',
                width: '100%',
                height: '100%'
            }}
        >
            <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 2 }}>{t('payment-cancel')}</Typography>
            <Button
                color='bordoRed'
                variant='contained'
                component={RouterLink}
                to='/'
                endIcon={<ArrowForwardIcon />}
            >
                    {t('home')}
            </Button>
        </Box>
    );
}

export default Cancellation;