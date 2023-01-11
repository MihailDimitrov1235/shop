import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import FormBuilder from "../../../components/FormBuilder";
import * as Yup from 'yup';
import productService from '../../../services/product';
import categoryService from '../../../services/category';
import authorService from '../../../services/author';
import { useTranslation } from 'react-i18next';
import useMessage from '../../../hooks/useMessage';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
  const { t } = useTranslation();
  const { addMessage } = useMessage();
  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);

  useEffect(() => {
    categoryService.getAll()
      .then((res) => {
        let newCategoryOptions = [];

        res.data.forEach((el) => {
          newCategoryOptions.push({ label: el.name, value: el.id });
        })

        setCategoryOptions(newCategoryOptions);
      })
      .catch((error) => {
        console.log(error);
      })

    authorService.getAll()
      .then((res) => {
        let newAuthorOptions = [];

        res.data.forEach((el) => {
          newAuthorOptions.push({ label: el.name, value: el.id });
        })

        setAuthorOptions(newAuthorOptions);
      })
      .catch((error) => {
        console.log(error);
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
    productService.createService(values)
        .then((res) => {
            addMessage(t('product-created'), 'success');
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
    { type: 'autocomplete', name: 'category', label: t('category'), options: categoryOptions, multiple: true }
  ];

  const submitButton = {
    color: 'bordoRed'
  };

  return (
    <>
            <Helmet>
                <title>{t('products-create')} | {t('ban')}</title>
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
};

export default AddProductForm;