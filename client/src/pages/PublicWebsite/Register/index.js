import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
    Card,
    Tabs,
    Tab
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserForm from '../../../components/PublicWebsite/register/UserForm';
import AuthorForm from '../../../components/PublicWebsite/register/AuthorForm';

const useStyles = makeStyles({
    flexContainer: {
        justifyContent: 'end',
    },
});

const Register = () => {
    const { t } = useTranslation();
    const [mode, setMode] = useState('user');

    const handleModeTabChange = (event, newValue) => {
        setMode(newValue);
    };

    const classes = useStyles();


    return (
        <>
            <Helmet>
                <title>{t('sign-up')} | {t('ban')}</title>
            </Helmet>
            <Box sx={{ mt: 10 }}>
                <Container maxWidth="sm">
                    <Tabs
                        value={mode}
                        onChange={handleModeTabChange}
                        indicatorColor='inherit'
                        textColor='inherit'
                        classes={{
                            flexContainer: classes.flexContainer
                        }}
                        sx={{ color: 'black' }}
                    >
                        <Tab
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '10px 10px 0 0',
                                mr: 1
                            }}
                            value={'user'}
                            label={t('user')}
                        />
                        <Tab
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '10px 10px 0 0',
                                mr: 1
                            }}
                            value={'author'}
                            label={t('author')}
                        />
                    </Tabs>
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography
                                color="textPrimary"
                                variant="h3"
                            >
                                {t('sign-up')}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                {t('sign-up-text')}
                            </Typography>
                        </Box>

                        <Box>
                            {mode === 'user' ? <UserForm /> : <AuthorForm />}
                        </Box>

                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            {t('have-account')}
                            {' '}
                            <Link component={RouterLink} to='/login' variant='subtitle1' underline='hover' color='primary.contrastText'>
                                {t('sign-in')}
                            </Link>
                        </Typography>
                    </Card>
                </Container>
            </Box>
        </>
    );
}

export default Register;