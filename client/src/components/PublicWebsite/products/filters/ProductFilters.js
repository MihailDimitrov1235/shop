import { useEffect, useState } from 'react';
import { Card, Typography } from '@mui/material';
import FilterCard from './FilterCard';
import { useTranslation } from 'react-i18next';
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

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];

export default ProductFilters;