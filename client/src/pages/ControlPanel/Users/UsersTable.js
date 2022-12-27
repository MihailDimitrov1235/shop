import React from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FilteredTable from '../../../components/ControlPanel/Table/FilteredTable';
import { useTranslation } from 'react-i18next';

function createData(id, name, email, email_verified_at, password, purchase_ids, created_at, updated_at) {
  return { id, name, email, email_verified_at, password, purchase_ids, created_at, updated_at };
}

const rows = [
  createData(1, 'User 1', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [1, 2, 3], '2022-01-01', '2022-01-02'),
  createData(2, 'User 2', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [4, 5], '2022-01-03', '2022-01-04'),
  createData(3, 'User 1', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [1, 2, 3], '2022-01-01', '2022-01-02'),
  createData(4, 'User 1', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [1, 2, 3], '2022-01-01', '2022-01-02'),
  createData(5, 'User 1', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [1, 2, 3], '2022-01-01', '2022-01-02'),
  createData(6, 'User 1', 'zelkata@abv.bg', 'YYYY-MM-DD', 'password', [1, 2, 3], '2022-01-01', '2022-01-02'),
  // Add more rows as needed
];

function UsersTable() {

    const { t } = useTranslation();

    const columns = [
    { id: 'id', label: t('user-id') },
    { id: 'name', label: t('name') },
    { id: 'email', label: t('email') },
    { id: 'email_verified_at', label: t('email-verified-at') },
    { id: 'password', label: t('password') },
    { id: 'purchase_ids', label: t('purchase-ids') },
    { id: 'created_at', label: t('created-at') },
    { id: 'updated_at', label: t('updated-at') },
    ];

    return (
    <Card sx={{ p: 2 }}>
        <PerfectScrollbar>
        <Box>
            <FilteredTable
            rows={rows}
            columns={columns}
            checkbox
            />
        </Box>
        </PerfectScrollbar>
    </Card>
    );
    }

    export default UsersTable;