import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import productService from '../../../services/product';
import useMessage from '../../../hooks/useMessage';
import { Helmet } from 'react-helmet';

import MainTable from '../../../components/MainTable';

function ProductTable() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { t, i18n } = useTranslation();
    const { addMessage } = useMessage();

    useEffect(() => {
        newRequest();
    }, []);

    const headings = [
        { id: 'id', label: t('product-id'), order: true },
        { id: 'name', label: t('product-name'), order: true },
        { id: 'authors', label: t('authors'), order: false, arrayId: 'author', selector: 'name' },
        { id: 'categories', label: t('categories'), order: false, arrayId: 'category', selector: 'name' },
        { id: 'parts', label: t('parts-count'), order: true, align: 'center' },
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: t('search-in') + t('product-id') },
        'name': { type: 'search', name: 'name', placeholder: t('search-in') + t('product-name') },
        'authors': { type: 'search', name: 'authors', placeholder: t('search-in') + t('authors') },
        'categories': { type: 'search', name: 'categories', placeholder: t('search-in') + t('categories') },
        'parts': { type: 'search', name: 'parts', placeholder: t('search-in') + t('parts-count') },
    }

    const newRequest = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        productService.getProducts(pagination, filters, order, i18n.language)
            .then((res) => {
                setData(res.data.data);
                setTotal(res.data.total);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteHandler = (selected) => {
    //   productService.deleteProducts(selected)
    //         .then((res) => {
    //             console.log(res)
    //             addMessage(t('product-deleted'), 'success')
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    }

    return (
        <>
            <Helmet>
                <title>{t('products')} | {t('ban')}</title>
            </Helmet>
            <Card sx={{ p: 2 }}>
                <PerfectScrollbar>
                    <Box>
                        <MainTable
                            headings={headings}
                            headFilters={headFilters}
                            rows={data}
                            total={total}
                            method={newRequest}
                            deleteHandler={deleteHandler}
                            options={{
                                checkbox: true,
                                add: true,
                                delete: true,
                                edit: true
                            }}
                        />
                    </Box>
                </PerfectScrollbar>
            </Card>
        </>
    );
}

export default ProductTable;