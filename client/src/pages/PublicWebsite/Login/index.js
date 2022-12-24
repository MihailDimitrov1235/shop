import {
    Box,
    Container,
    Typography
} from '@mui/material';
import { Helmet } from 'react-helmet';
import FormBuilder from "../../../components/FormBuilder";
import * as Yup from 'yup';
import userService from '../../../services/user';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Имейлът не е валиден').max(255).required('Имейлът е задължителен'),
        password: Yup.string().max(255).required('Паролата е задължителна')
    });

    const onSubmit = (values, { setSubmitting }) => {
        userService.login(values)
        .then((res) => {
            localStorage.setItem('refresh-token', res.data.token);
            setUser(res.data.user);
            navigate('/admin', { replace: true });
        })
        .catch((err) => {
            setSubmitting(false);
        })
    };

    const fields = [
        { type: 'email', name: 'email', label: 'Имейл' },
        { type: 'password', name: 'password', label: 'Парола' }
    ];

    const submitButton = {
        label: 'Влизане',
        color: 'bordoRed'
    };

    return (
        <>
            <Helmet>
                <title>Login | Material Kit</title>
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
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            color="textPrimary"
                            variant="h2"
                        >
                            Вход
                        </Typography>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            Въведете имейл и парола, за да влезете в системата
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
                </Container>
            </Box>
        </>
    );
}

export default Login;