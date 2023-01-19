import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import FormBuilder from "../../../components/FormBuilder";
import * as Yup from 'yup';
import authorService from '../../../services/author';
import { useTranslation } from 'react-i18next';
import useMessage from '../../../hooks/useMessage';
import { useNavigate, useParams } from 'react-router-dom';

const EditAuthor = () => {
    const { t } = useTranslation();
    const { addMessage } = useMessage();
    const navigate = useNavigate();
    const { id } = useParams();
    const [authorInitValues, setAuthorInitValues] = useState({ 
        lang: { bg: { name: '' }, en: { name: '' } },
        email: '',
        phone: ''
    });

    useEffect(() => {
        authorService.getAuthorById(id)
            .then((res) => {
                let initValues = {
                    lang: {},
                    email: res.data.email,
                    phone: res.data.phone
                }

                res.data.trans.forEach((trans) => {
                    initValues.lang[trans.lang] = {
                        name: trans.name
                    }
                })
                
                setAuthorInitValues(initValues);
            })
    }, []);

    const validationSchema = Yup.object().shape({
        //name: Yup.string().max(255).required(t('name-required')),
        email: Yup.string().email(t('email-invalid')).max(255).required(t('email-required')),
        phone: Yup.string().max(10, t('phone-invalid')).required(t('phone-required')).min(10, t('phone-invalid')),
    });

    const onSubmit = (values, { setSubmitting }) => {
        authorService.editAuthor(values, id)
            .then((res) => {
                addMessage(t('author-edited'), 'success');
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
        {
            type: 'lang', name: 'lang', selectors: ['bg', 'en'], fields: [
                { type: 'text', name: 'name', label: t('name') },
            ]
        },
        { type: 'email', name: 'email', label: t('email') },
        { type: 'text', name: 'phone', label: t('phone') },
    ];

    const submitButton = {
        color: 'bordoRed',
        label: t('edit')
    };

    return (
        <>
            <Helmet>
                <title>{t('authors-edit')} | {t('ban')}</title>
            </Helmet>
            <Card sx={{ p: 2 }}>
                <PerfectScrollbar>
                    <Box>
                        <FormBuilder
                            fields={fields}
                            initialValues={authorInitValues}
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

export default EditAuthor;