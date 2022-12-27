import React from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FilteredTable from '../../../components/ControlPanel/Table/FilteredTable';
import { useTranslation } from 'react-i18next';

function createData(id, name, username, password, email, role, created_at, updated_at) {
  return { id, name, username, password, email, role, created_at, updated_at };
}

const rows = [
  createData(1, 'Admin 1', 'zevs', 'password', 'zelkata@abv.bg', 'administrator', '2022-01-01', '2022-01-02'),
  createData(2, 'Admin 2', 'zevs', 'password', 'zelkata@abv.bg', 'administrator', '2022-01-03', '2022-01-04'),
  createData(3, 'Admin 1', 'zevs', 'password', 'zelkata@abv.bg', 'administrator', '2022-01-01', '2022-01-02'),
  createData(4, 'Admin 1', 'zevs', 'password', 'zelkata@abv.bg', 'administrator', '2022-01-01', '2022-01-02'),
  createData(5, 'Admin 1', 'zevs', 'password', 'zelkata@abv.bg', 'administrator', '2022-01-01', '2022-01-02'),
  createData(6, 'Admin 1', 'zevs', 'password', 'zelkata@abv.bg', 'administrator', '2022-01-01', '2022-01-02'),
  // Add more rows as needed
];

function AdminsTable() {

    const { t } = useTranslation();

    const columns = [
    { id: 'id', label: t('admin-id') },
    { id: 'name', label: t('name') },
    { id: 'username', label: t('username') },
    { id: 'password', label: t('password') },
    { id: 'email', label: t('email') },
    { id: 'role', label: t('role') },
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

    export default AdminsTable;