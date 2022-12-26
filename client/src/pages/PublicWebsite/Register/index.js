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

const Register = () => {


    const initialValues = {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Името e задължително'),
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
        password: Yup.string().max(255).required('Паролата е задължителна').min(8, 'Паролата трябва да бъде поне 8 символа'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Паролите не съвпадат'),
    });

    const onSubmit = (values, { setSubmitting }) => {
       
    };

    const fields = [
        { type: 'text', name: 'name', label: 'Име' },
        { type: 'email', name: 'email', label: 'Имейл' },
        { type: 'password', name: 'password', label: 'Парола' },
        { type: 'password', name: 'repeatPassword', label: 'Повторете паролата' } 
    ];

    const submitButton = {
        label: 'Регистрация',
        color: 'bordoRed'
    };

    return (
        <>
            <Helmet>
                <title>Регистрация | БАН</title>
            </Helmet>
            <Box sx={{ mt: 10 }}>
                <Container maxWidth="sm">
                    <Card sx={{ p: 3 }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography
                                color="textPrimary"
                                variant="h2"
                            >
                                Регистриране
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Въведете данните за регистрация
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

                        <Typography
                            color="textSecondary"
                            variant="body1"
                        >
                            Вече имате регистрация?
                            {' '}
                            <Link component={RouterLink} to='/login' variant='h5' underline='hover' color='primary.contrastText'>
                                Вход
                            </Link>
                        </Typography>
                    </Card>
                </Container>
            </Box>
        </>
    );
}

export default Register;