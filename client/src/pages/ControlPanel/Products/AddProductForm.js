import React from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import FormBuilder from '../../../components/FormBuilder';
import * as Yup from 'yup';

const AddProductForm = () => {
  const { t } = useTranslation();

  const authorOptions = [
    { label: 'Miroslav Dianov Balev', value: 1 },
    { label: 'Mihail Vladimirov Dimitrov', value: 2 },
    { label: 'Stefan Ivanov? Kojuharov', value: 3 }
  ];

  const categoryOptions = [
    { label: 'Zelen', value: 1 },
    { label: 'Biologi4en', value: 2 },
    { label: 'Grozen', value: 3 }
  ];

  const initialValues = {
    name: '',
    author: '',
    shortDescription: '',
    longDescription: '',
    category: '',
    parts: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required(t('name-required')),
    author: Yup.array().required(t('author-required')),
    shortDescription: Yup.string().required(t('short-description-required')),
    longDescription: Yup.string().required(t('long-description-required')),
    category: Yup.object().required(t('category-required')),
    parts: Yup.number().required(t('parts-required'))
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
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
    color: 'bordoRed'
  };

  return (
    <Card sx={{ p: 2 }}>
      <PerfectScrollbar>
        <Box>
          <FormBuilder
            fields={fields}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitButton={submitButton}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default AddProductForm;