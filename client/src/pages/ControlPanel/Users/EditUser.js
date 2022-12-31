import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import FormBuilder from "../../../components/FormBuilder";
import * as Yup from 'yup';
import userService from '../../../services/user';
import { useTranslation } from 'react-i18next';
import useMessage from '../../../hooks/useMessage';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const { t } = useTranslation();
    const { addMessage } = useMessage();
    const navigate = useNavigate();
    const { id } = useParams();
    const [userInitValues, setUserInitValues] = useState({ name: '', email: '' });

    useEffect(() => {
        userService.getUserById(id)
            .then((res) => {
                setUserInitValues({ name: res.data.name, email: res.data.email });
            })
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required(t('name-required')),
        email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required')),
    });

    const onSubmit = (values, { setSubmitting }) => {
        userService.editUser(values, id)
            .then((res) => {
                addMessage(t('user-edited'), 'success');
                navigate('/admin/users');
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    addMessage(t(error.response.data.errors[0]), 'error');
                }

                setSubmitting(false)
            })
    };

    const fields = [
        { type: 'text', name: 'name', label: t('name') },
        { type: 'email', name: 'email', label: t('email') }
    ];

    const submitButton = {
        color: 'bordoRed',
        label: t('edit')
    };

    return (
        <>
            <Helmet>
                <title>{t('users-edit')} | {t('ban')}</title>
            </Helmet>
            <Card sx={{ p: 2 }}>
                <PerfectScrollbar>
                    <Box>
                        <FormBuilder
                            fields={fields}
                            initialValues={userInitValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            submitButton={submitButton}
                            enableReinitialize
                        />
                    </Box>
                </PerfectScrollbar>
            </Card>
        </>
    );
}

export default EditUser;