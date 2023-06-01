import { Stack, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
                component={Link}
                href='/'
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2 }}
            >
                {t('home')}
            </Button>
        </Stack>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ... (await serverSideTranslations(locale))
        }
    }
  }

// We have received your payment. You can now access all the features in our app.

export default Success;