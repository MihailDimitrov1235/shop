import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import useMessage from '../../../hooks/useMessage';
import blogService from '../../../services/blog';

import MainTable from '../../../components/MainTable';

const RequestPost = () =>{
    const { t, i18n } = useTranslation();
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const { addMessage } = useMessage();

    const deleteHandler = (selected) => {
        blogService.deletePosts(selected)
            .then((res) => {
                console.log(res)
                addMessage(t('post-deleted'), 'success')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const approveHandler = (selected) => {
        console.log(selected)
        blogService.approvePosts(selected)
            .then((res) => {
                console.log(res)
                addMessage(t('post-approved'), 'success')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const newRequest = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        blogService.getRequests(pagination, filters, order, i18n.language)
            .then((res) => {
                setData(res.data.data);
                setTotal(res.data.total);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    
    const headings = [
        { id: 'id', label: t('author-id'), order: true },
        { id: 'name', label: t('name'), order: true },
        { id: 'created_at', label: t('time-ago'), order: true },
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: t('search-in') + t('author-id') },
        'name': { type: 'search', name: 'name', placeholder: t('search-in') + t('name') },
        'created_at': { type: 'order', name: 'created_at' },
    }

    return(
    <>
        <Helmet>
            <title>{t('requests')} | {t('ban')}</title>
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
                            approveHandler={approveHandler}
                            options={{
                                checkbox: true,
                                add: false,
                                delete: true,
                                edit: false,
                                approve: true,
                                previewHref: '/post/edit',
                            }}
                        />
                    </Box>
                </PerfectScrollbar>
            </Card>
    </>
    )
}

export default RequestPost