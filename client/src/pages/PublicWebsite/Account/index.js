import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid
} from '@mui/material';
import AccountProfile from '../../../components/account/AccountProfile';
import AccountProfileDetails from '../../../components/account/AccountProfileDetails';
import { useTranslation } from 'react-i18next';

const Account = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t('account')} | {t('ban')}</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    py: 3,
                    mt: 10
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <AccountProfile />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <AccountProfileDetails />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Account;