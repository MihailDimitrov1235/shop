import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
                height: '100vh'
            }}
        >
            <Typography variant='h3' sx={{ fontWeight: 'bold' }}>{t('payment-cancel')}</Typography>
            <p>
                {t('payment-cancel-info')}
            </p>
            <Button
                color='bordoRed'
                variant='contained'
                component={Link}
                href='/'
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2 }}
            >
                    {t('home')}
            </Button>
        </Box>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ... (await serverSideTranslations(locale))
        }
    }
  }

export default Cancellation;