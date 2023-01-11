import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import FormBuilder from "../../../components/FormBuilder";
import * as Yup from 'yup';
import authorService from '../../../services/author';
import { useTranslation } from 'react-i18next';
import useMessage from '../../../hooks/useMessage';
import { useNavigate } from 'react-router-dom';

const AddUserForm = () => {
    const { t } = useTranslation();
    const { addMessage } = useMessage();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required(t('name-required')),
        email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required')),
        phone: Yup.string().max(10, t('phone-invalid')).required(t('phone-required')).min(10, t('phone-invalid')),
    });

    const onSubmit = (values, { setSubmitting }) => {
        authorService.createAuthor(values)
            .then((res) => {
                addMessage(t('user-created'), 'success');
                navigate('/admin/authors');
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
        { type: 'email', name: 'email', label: t('email') },
        { type: 'text', name: 'phone', label: t('phone') },
    ];

    const submitButton = {
        color: 'bordoRed'
    };

    return (
        <>
            <Helmet>
                <title>{t('authors-create')} | {t('ban')}</title>
            </Helmet>
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
        </>
    );
}

export default AddUserForm;