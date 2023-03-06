import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Grid
} from '@mui/material';
import AccountProfile from '../../../components/account/AccountProfile';
import AccountProfileDetails from '../../../components/account/AccountProfileDetails';
import AccountProfileSettings from '../../../components/account/AccountProfileSettings';
import { useTranslation } from 'react-i18next';

const Account = () => {
    const { t } = useTranslation();
    const [menu, setMenu] = useState('home');

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
                            <AccountProfile menu={menu} setMenu={setMenu} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            {menu === 'home' && <AccountProfileDetails />}
                            {menu === 'settings' && <AccountProfileSettings />}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Account;