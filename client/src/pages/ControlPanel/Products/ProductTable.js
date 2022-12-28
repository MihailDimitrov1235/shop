import React from 'react';
import { Box, Card } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FilteredTable from '../../../components/ControlPanel/Table/FilteredTable';
import { useTranslation } from 'react-i18next';

function createData(id, name, author_ids, short_description, long_description, category_ids, parts, created_at, updated_at) {
  return { id, name, author_ids, short_description, long_description, category_ids, parts, created_at, updated_at };
}

const rows = [
  createData(1, 'Product 1', [1, 2], 'Short description 1', 'Long description 1uhfffffhfiiiiiiiiiiiiiiiiiweugyuwegyfuwefgyweugfuyewffffffffffffffwe', [1, 2, 3], 10, '2022-01-01', '2022-01-02'),
  createData(2, 'Product 2', [3, 4], 'Short description 2', 'Long description 2', [4, 5], 20, '2022-01-03', '2022-01-04'),
  createData(3, 'Product 1', [1, 2], 'Short description 1', 'Long description 1uhfffffhfiiiiiiiiiiiiiiiiiweugyuwegyfuwefgyweugfuyewffffffffffffffwe', [1, 2, 3], 10, '2022-01-01', '2022-01-02'),
  createData(4, 'Product 1', [1, 2], 'Short description 1', 'Long description 1uhfffffhfiiiiiiiiiiiiiiiiiweugyuwegyfuwefgyweugfuyewffffffffffffffwe', [1, 2, 3], 10, '2022-01-01', '2022-01-02'),
  createData(5, 'Product 1', [1, 2], 'Short description 1', 'Long description 1uhfffffhfiiiiiiiiiiiiiiiiiweugyuwegyfuwefgyweugfuyewffffffffffffffwe', [1, 2, 3], 10, '2022-01-01', '2022-01-02'),
  createData(6, 'Product 1', [1, 2], 'Short description 1', 'Long description 1uhfffffhfiiiiiiiiiiiiiiiiiweugyuwegyfuwefgyweugfuyewffffffffffffffwe', [1, 2, 3], 10, '2022-01-01', '2022-01-02'),
  // Add more rows as needed
];

function ProductTable() {

  const { t } = useTranslation();

  const columns = [
    { id: 'id', label: t("product-id") },
    { id: 'name', label: t("name") },
    { id: 'author_ids', label: t("author-ids") },
    { id: 'short_description', label: t("short-description") },
    { id: 'long_description', label: t("long-description") },
    { id: 'category_ids', label: t("category-ids") },
    { id: 'parts', label: t("parts") },
    { id: 'created_at', label: t("created-at") },
    { id: 'updated_at', label: t("updated-at") },
  ];

  return (
    <Card sx={{ p: 2 }}>
      <PerfectScrollbar>
        <Box>
          <FilteredTable
            rows={rows}
            columns={columns}
            checkbox
            editOption
            deleteOption
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

export default ProductTable;