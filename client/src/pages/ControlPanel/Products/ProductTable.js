import React from 'react';
import { Box } from '@mui/material';
import FilteredTable from '../../../components/ControlPanel/Table/FilteredTable';
import axios from 'axios';



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

  const columns = [
    { id: 'id', label: 'Product ID' },
    { id: 'name', label: 'Name' },
    { id: 'author_ids', label: 'Author IDs' },
    { id: 'short_description', label: 'Short Description' },
    { id: 'long_description', label: 'Long Description' },
    { id: 'category_ids', label: 'Category IDs' },
    { id: 'parts', label: 'Parts' },
    { id: 'created_at', label: 'Created At' },
    { id: 'updated_at', label: 'Updated At' },
  ];

  return (
    <Box>
      <FilteredTable
        rows={rows}
        columns={columns}
        checkbox
      />
    </Box>
  );
}

export default ProductTable;