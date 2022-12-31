import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import userService from '../../../services/user';
import useMessage from '../../../hooks/useMessage';

import MainTable from '../../../components/MainTable';

function UsersTable() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { t } = useTranslation();
    const { addMessage } = useMessage();

    useEffect(() => {
        newRequest();
    }, []);

    const headings = [
        { id: 'id', label: t('user-id'), order: true },
        { id: 'name', label: t('name'), order: true },
        { id: 'email', label: t('email'), order: true },
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: t('search-in') + t('user-id') },
        'name': { type: 'search', name: 'name', placeholder: t('search-in') + t('name') },
        'email': { type: 'search', name: 'email', placeholder: t('search-in') + t('email') }
    }

    const newRequest = (page, total, filters = [], order = {}) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        userService.getUsers(pagination, filters, order)
            .then((res) => {
                setData(res.data.data);
                setTotal(res.data.total);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteHandler = (selected) => {
        userService.deleteUsers(selected)
            .then((res) => {
                console.log(res)
                addMessage(t('user-successfuly-deleted'), 'success')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
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
    );
}

export default UsersTable;