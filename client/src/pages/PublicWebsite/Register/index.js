import {
    Box,
    Container,
    Typography,
    Link,
    Card
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link as RouterLink } from 'react-router-dom';
import FormBuilder from "../../../components/FormBuilder";
import * as Yup from 'yup';
import userService from '../../../services/user';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required(t('name-required')),
        email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required')),
        password: Yup.string().max(255).required(t('password-required')).min(8, t('password-invalid')),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], t('passwords-not-match')),
    });

    const onSubmit = (values, { setSubmitting }) => {
        userService.register(values)
            .then((res) => {
                localStorage.setItem('refresh-token', res.data.token);
                const user = res.data.user;
                setUser(user);
                navigate('/', { replace: true });
            })
            .catch((err) => {
                setSubmitting(false);
            })
    };

    const fields = [
        { type: 'text', name: 'name', label: t('name') },
        { type: 'email', name: 'email', label: t('email') },
        { type: 'password', name: 'password', label: t('password') },
        { type: 'password', name: 'repeatPassword', label: t('repeat-password') }
    ];

    const submitButton = {
        label: t('sign-up'),
        color: 'bordoRed'
    };

    return (
        <>
            <Helmet>
                <title>{t('sign-up')} | {t('ban')}</title>
            </Helmet>
            <Box sx={{ mt: 10 }}>
                <Container maxWidth="sm">
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