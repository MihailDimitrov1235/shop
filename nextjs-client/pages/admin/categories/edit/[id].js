import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import FormBuilder from "@/components/FormBuilder";
import * as Yup from 'yup';
import categoryService from '@/services/category';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useMessage from '@/hooks/useMessage';
import { useRouter } from 'next/router';

const EditCategory = () => {
    const { t } = useTranslation();
    const { addMessage } = useMessage();
    const router = useRouter();
    const { id } = router.query;
    const [categoryInitValues, setCategoryInitValues] = useState({ lang: { bg: { name: '' }, en: { name: '' }  } });

    useEffect(() => {
        categoryService.getCategoryById(id)
            .then((res) => {
                let initValues = {
                    lang: {}
                }

                res.data.trans.forEach((trans) => {
                    initValues.lang[trans.lang] = {
                        name: trans.name
                    }
                })

                setCategoryInitValues(initValues);
            })
    }, []);

    const validationSchema = Yup.object().shape({
        //name: Yup.string().max(255).required(t('name-required'))
    });

    const onSubmit = (values, { setSubmitting }) => {
        categoryService.editCategory(values, id)
            .then((res) => {
                addMessage(t('category-edited'), 'success');
                router.push('/admin/categories');
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
    ];

    const submitButton = {
        color: 'bordoRed',
        label: t('edit')
    };

    return (
        <>
            <Helmet>
                <title>{t('category-edit')} | {t('ban')}</title>
            </Helmet>
            <Card sx={{ p: 2 }}>
                <PerfectScrollbar>
                    <Box>
                        <FormBuilder
                            fields={fields}
                            initialValues={categoryInitValues}
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

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ... (await serverSideTranslations(locale))
        }
    }
  }

export default EditCategory;