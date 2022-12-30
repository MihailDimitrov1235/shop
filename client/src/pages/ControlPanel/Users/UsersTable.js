import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FilteredTable from '../../../components/ControlPanel/Table/FilteredTable';
import { useTranslation } from 'react-i18next';
import userService from '../../../services/user';

import MainTable from '../../../components/MainTable';

// function createData(id, name, email, email_verified_at, password, purchase_ids, created_at, updated_at) {
//   return { id, name, email, email_verified_at, password, purchase_ids, created_at, updated_at };
// }

// const rows = [
//   createData(1, 'User 1', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [1, 2, 3], '2022-01-01', '2022-01-02'),
//   createData(2, 'User 2', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [4, 5], '2022-01-03', '2022-01-04'),
//   createData(3, 'User 1', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [1, 2, 3], '2022-01-01', '2022-01-02'),
//   createData(4, 'User 1', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [1, 2, 3], '2022-01-01', '2022-01-02'),
//   createData(5, 'User 1', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [1, 2, 3], '2022-01-01', '2022-01-02'),
//   createData(6, 'User 1', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [1, 2, 3], '2022-01-01', '2022-01-02'),
//   // Add more rows as needed
// ];

function UsersTable() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        newRequest();
    }, []);

    const headings = [
        { id: 'id', label: t('user-id'), order: true },
        { id: 'name', label: t('name') },
        { id: 'email', label: t('email') },
        //{ id: 'email_verified_at', label: t('email-verified-at') },
        //{ id: 'password', label: t('password') },
        //{ id: 'purchase_ids', label: t('purchase-ids') },
        //{ id: 'created_at', label: t('created-at') },
        //{ id: 'updated_at', label: t('updated-at') },
    ];

    const headFilters = {
        'id': { type: 'search', name: 'id', placeholder: t('search-in') + t('user-id') }
    }

    const newRequest = (page, total) => {
        const pagination = {
            page: page || 1,
            total: total || 10
        }

        userService.getUsers(pagination)
            .then((res) => {
                setData(res.data.data);
                setTotal(res.data.total);
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