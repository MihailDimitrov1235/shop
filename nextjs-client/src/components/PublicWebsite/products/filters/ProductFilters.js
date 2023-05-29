import { useEffect, useState } from 'react';
import { Card, Typography } from '@mui/material';
import FilterCard from './FilterCard';
import { useTranslation } from 'next-i18next';
import AutocompleteCheckboxes from '../../../filters/AutocompleteCheckboxes';
import categoryService from '../../../../services/category';
import authorService from '../../../../services/author';

const ProductFilters = () => {
    const { t, i18n } = useTranslation();
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [authorsOptions, setAuthorsOptions] = useState([]);

    useEffect(() => {
        categoryService.getAll(i18n.language)
            .then((res) => {
                const options = res.data.map((el) => ({ label: el.name, value: el.id }));
                setCategoriesOptions(options);
            })
            .catch((error) => {
                console.log(error);
            })

        authorService.getAll(i18n.language)
            .then((res) => {
                const options = res.data.map((el) => ({ label: el.name, value: el.id }))
                setAuthorsOptions(options);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [i18n.language])

    return (
        <Card style={{
            paddingTop: '40px',
        }}
            elevation={3}
        >
            <Typography variant='h3' style={{ textAlign: 'center' }}>{t('filters')}</Typography>

            <FilterCard component={<AutocompleteCheckboxes label={t('categories')} options={categoriesOptions} />} />
            <FilterCard component={<AutocompleteCheckboxes label={t('authors')} options={authorsOptions} />} />
        </Card>
    );
}



export default ProductFilters;