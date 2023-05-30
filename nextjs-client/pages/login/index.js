import {
    Box,
    Container,
    Typography,
    Card
} from '@mui/material';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FormBuilder from "../../src/components/FormBuilder";
import * as Yup from 'yup';
import userService from '../../src/services/user';
import useAuth from '../../src/hooks/useAuth';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Login = () => {
    const router = useRouter();
    const { setUser } = useAuth();
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required')),
        password: Yup.string().max(255).required(t('password-required'))
    });

    const onSubmit = (values, { setSubmitting }) => {
        userService.login(values)
            .then((res) => {
                localStorage.setItem('refresh-token', res.data.token);
                const user = res.data.user;
                setUser(user);
                if (user.role_id === 1) {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
            })
            .catch((err) => {
                setSubmitting(false);
            })
    };

    const fields = [
        { type: 'email', name: 'email', label: t('email') },
        { type: 'password', name: 'password', label: t('password') }
    ];

    const submitButton = {
        label: t('sign-in'),
        color: 'bordoRed'
    };

    return (
        <>
            <Helmet>
                <title>{t('sign-in')} | {t('ban')}</title>
            </Helmet>
            <Box
                sx={{
                    mt: 10
                    // backgroundColor: 'background.default',
                    // display: 'flex',
                    // flexDirection: 'column',
                    // height: '100%',
                    // justifyContent: 'center'
                }}
            >
                <Container maxWidth="sm">
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography
                                color="textPrimary"
                                variant="h3"
                            >
                                {t('sign-in')}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                {t('sign-in-text')}
                            </Typography>
                        </Box>

                        <Box>
                            <FormBuilder
                                fields={fields}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                submitButton={submitButton}
                            />
                        </Box>

                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            {t('no-account')}
                            {' '}
                            <Link component={Link} href='/register' variant='subtitle1' underline='hover' color='primary.contrastText'>
                                {t('sign-up')}
                            </Link>
                        </Typography>
                    </Card>
                </Container>
            </Box>
        </>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ... (await serverSideTranslations(locale))
        }
    }
  }

export default Login;