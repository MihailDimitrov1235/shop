import {
    Box,
    Container,
    Typography,
    Card
} from '@mui/material';
import { Helmet } from 'react-helmet';
import FormBuilder from "../../../components/FormBuilder";
import * as Yup from 'yup';
import userService from '../../../services/user';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const AddUserForm = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { t } = useTranslation();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

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
        label: t('create'),
        color: 'bordoRed'
    };

    return (
        <>
            <Helmet>
                <title>{t('create-user-title')}</title>
            </Helmet>
            <Box sx={{ mt: 10 }}>
                <Container maxWidth="sm">
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography
                                color="textPrimary"
                                variant="h2"
                            >
                                {t('create-user')}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                {t('create-user-text')}
                            </Typography>
                        </Box>

                        <Box>
                            <FormBuilder
                                fields={fields}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                submitButton={submitButton}
                            />
                        </Box>
                    </Card>
                </Container>
            </Box>
        </>
    );
}

export default AddUserForm;