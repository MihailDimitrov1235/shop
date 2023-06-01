import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useMessage from '@/hooks/useMessage';
import blogService from '@/services/blog';

import MainTable from '@/components/MainTable';

const BlogTable = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { t, i18n } = useTranslation();
    const { addMessage } = useMessage();

    useEffect(() => {
        newRequest();
    }, []);

    const headings = [
        { id: 'id', label: t('blog-id'), order: true },
        { id: 'slug', label: t('slug'), order: true },
        { id: 'title', label: t('title'), order: false },
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: t('search-in') + t('blog-id') },
        'slug': { type: 'search', name: 'slug', placeholder: t('search-in') + t('slug') },
        'title': { type: 'search', name: 'title', placeholder: t('search-in') + t('title') }
    }

    const newRequest = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        blogService.getPosts(pagination, filters, order, i18n.language)
            .then((res) => {
                setData(res.data.data);
                setTotal(res.data.total);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteHandler = (selected) => {
        blogService.deletePosts(selected)
            .then((res) => {
                addMessage(t('blog-deleted'), 'success')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <Helmet>
                <title>{t('blog')} | {t('ban')}</title>
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

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ... (await serverSideTranslations(locale))
        }
    }
  }

export default BlogTable;