import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Helmet } from 'react-helmet';
import FormBuilder from "@/components/FormBuilder";
import * as Yup from 'yup';
import productService from '@/services/product';
import categoryService from '@/services/category';
import authorService from '@/services/author';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useMessage from '@/hooks/useMessage';
import { useRouter } from 'next/router';
import formData from '@/components/FormBuilder/utils/formData';

import InfoIcon from '@mui/icons-material/Info';
import InventoryIcon from '@mui/icons-material/Inventory';

const AddProductForm = () => {
  const { t, i18n } = useTranslation();
  const { addMessage } = useMessage();
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);

  useEffect(() => {
    categoryService.getAll(i18n.language)
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

    authorService.getAll(i18n.language)
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
  }, [i18n.language]);

  const validationSchema = Yup.object().shape({
    author: Yup.array().required(t('author-required')),
    // shortDescription: Yup.string().required(t('short-description-required')),
    // longDescription: Yup.string().required(t('long-description-required')),
    category: Yup.array().required(t('category-required')),
    parts: Yup.array().of(Yup.object().shape({
      price: Yup.number().required(t('price-required'))
    }))
    //parts: Yup.number().required(t('parts-required'))
  });

  const onSubmit = (values, { setSubmitting }) => {
    const data = formData(values, [], ['picture']);

    values.parts.forEach(function(obj, index) {
      obj.uploader.forEach((file) => {
        data.append("partsFiles["+index+"][uploader][]", file);
      })
    });

    productService.createProduct(data)
      .then((res) => {
        addMessage(t('product-created'), 'success');
        router.push('/admin/products');
      })
      .catch((error) => {
        if (error.response.status == 422) {
          addMessage(t(error.response.data.errors[0]), 'error');
        }

        setSubmitting(false)
      })
  };

  const menus = [
    { id: 'information', label: t('product'), icon: InfoIcon },
    { id: 'parts', label: t('parts'), icon: InventoryIcon }
  ]

  const fields = {
    'information': [
      { type: 'upload', name: 'picture', label: t('picture'), accept: '.jpg,.png,.jpeg', multiple: false },
      { type: 'autocomplete', name: 'author', label: t('authors'), options: authorOptions, multiple: true },
      // { type: 'number', name: 'parts', label: t('parts-count') },
      { type: 'autocomplete', name: 'category', label: t('category'), options: categoryOptions, multiple: true },
      {
        type: 'lang', name: 'lang', selectors: ['bg', 'en'], fields: [
          { type: 'text', name: 'name', label: t('product-name') },
          { type: 'multiline', name: 'shortDescription', label: t('short-description') },
          { type: 'multiline', name: 'longDescription', label: t('long-description'), rows: 4 },
        ]
      },
    ],
    'parts': [
      {
        type: 'array', name: 'parts', label: t('parts'), itemLabel: t('part'), fields: [
          { type: 'number', name: 'price', label: t('price') },
          { type: 'upload', name: 'uploader', label: t('files'), accept: '.jpg,.png,.jpeg,.docx,.pdf,.doc', multiple: true },
        ]
      }
    ]
  };

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
              menus={menus}
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

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ... (await serverSideTranslations(locale))
        }
    }
  }

export default AddProductForm;