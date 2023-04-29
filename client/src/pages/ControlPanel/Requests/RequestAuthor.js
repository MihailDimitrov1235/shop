import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';

import MainTable from '../../../components/MainTable';

const RequestAuthor = () =>{
    const { t, i18n } = useTranslation();
    const [total, setTotal] = useState(0);

    const deleteHandler = (selected) => {
        console.log(selected)
        // authorService.deleteAuthors(selected)
        //     .then((res) => {
        //         console.log(res)
        //         addMessage(t('author-deleted'), 'success')
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    const approveHandler = (selected) => {
        console.log(selected)
        // authorService.deleteAuthors(selected)
        //     .then((res) => {
        //         console.log(res)
        //         addMessage(t('author-deleted'), 'success')
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    const newRequest = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        // authorService.getAuthors(pagination, filters, order, i18n.language)
        //     .then((res) => {
        //         setData(res.data.data);
        //         setTotal(res.data.total);
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }

    const data = [
        {id: 1, name:"Mihail", time: 100}, //time in minutes
        {id: 2, name:"Mihail", time: 1444},
        {id: 3, name:"Mihail", time: 1100},
        {id: 4, name:"Mihail", time: 9900},
        {id: 5, name:"Mihail", time: 50},
        {id: 6, name:"Mihail", time: 0.3},
    ]
    
    const headings = [
        { id: 'id', label: t('author-id'), order: true },
        { id: 'name', label: t('name'), order: true },
        { id: 'time', label: t('time-ago'), order: true },
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: t('search-in') + t('author-id') },
        'name': { type: 'search', name: 'name', placeholder: t('search-in') + t('name') },
        // 'time': { type: 'order', name: 'time', placeholder: t('search-in') + t('email') },
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
                                previewHref: '/author/edit',
                            }}
                        />
                    </Box>
                </PerfectScrollbar>
            </Card>
    </>
    )
}

export default RequestAuthor