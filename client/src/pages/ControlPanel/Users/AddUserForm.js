import {
    Box,
    Card
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import FormBuilder from "../../../components/FormBuilder";
import * as Yup from 'yup';
import userService from '../../../services/user';
import { useTranslation } from 'react-i18next';

const AddUserForm = () => {
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required(t('name-required')),
        email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required')),
        password: Yup.string().max(255).required(t('password-required')).min(8, t('password-invalid')),
        repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], t('passwords-not-match')),
    });

    const onSubmit = (values, { setSubmitting }) => {

    };

    const fields = [
        { type: 'text', name: 'name', label: t('name') },
        { type: 'email', name: 'email', label: t('email') },
        { type: 'password', name: 'password', label: t('password') },
        { type: 'password', name: 'repeatPassword', label: t('repeat-password') }
    ];

    const submitButton = {
        color: 'bordoRed'
    };

    return (
        <Card sx={{ p: 2 }}>
            <PerfectScrollbar>
                <Box>
                    <FormBuilder
                        fields={fields}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        submitButton={submitButton}
                    />
                </Box>
            </PerfectScrollbar>
        </Card>
    );
}

export default AddUserForm;