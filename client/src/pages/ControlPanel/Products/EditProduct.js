import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import FormBuilder from "../../../components/FormBuilder";
import * as Yup from 'yup';
import productService from '../../../services/product';
import { useTranslation } from 'react-i18next';
import useMessage from '../../../hooks/useMessage';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const { t } = useTranslation();
    const { addMessage } = useMessage();
    const navigate = useNavigate();
    const { id } = useParams();
    const [productInitValues, setProductInitValues] = useState({ name: '', author: [], parts: '', shortDescription: '', longDescription: '', categories: '' });

    useEffect(() => {
        productService.getProductById(id)
            .then((res) => {
                setProductInitValues({ name: res.data.name, author: res.data.authors, parts: res.data.parts, shortDescription: res.data.shortDescription, longDescription: res.data.longDescription, categories: res.data.categories });
            })
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(255).required(t('name-required')),
        author: Yup.array().required(t('author-required')),
        shortDescription: Yup.string().required(t('short-description-required')),
        longDescription: Yup.string().required(t('long-description-required')),
        category: Yup.object().required(t('category-required')),
        parts: Yup.number().required(t('parts-required'))
      });

    const onSubmit = (values, { setSubmitting }) => {
        productService.editProduct(values, id)
            .then((res) => {
                addMessage(t('product-edited'), 'success');
                navigate('/admin/products');
            })
            .catch((error) => {
                if (error.response.status == 422) {
                    addMessage(t(error.response.data.errors[0]), 'error');
                }

                setSubmitting(false)
            })
    };

    const fields = [
        { type: 'text', name: 'name', label: t('product-name') },
        { type: 'autocomplete', name: 'author', label: t('authors'), options: authorOptions, multiple: true },
        { type: 'number', name: 'parts', label: t('parts') },
        { type: 'multiline', name: 'shortDescription', label: t('short-description') },
        { type: 'multiline', name: 'longDescription', label: t('long-description'), rows: 4 },
        { type: 'autocomplete', name: 'category', label: t('category'), options: categoryOptions }
      ];

    const submitButton = {
        color: 'bordoRed',
        label: t('edit')
    };

    return (
        <>
            <Helmet>
                <title>{t('products-edit')} | {t('ban')}</title>
            </Helmet>
            <Card sx={{ p: 2 }}>
                <PerfectScrollbar>
                    <Box>
                        <FormBuilder
                            fields={fields}
                            initialValues={productInitValues}
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