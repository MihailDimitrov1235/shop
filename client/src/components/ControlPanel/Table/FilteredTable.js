import AdminTable from "./AdminTable";
import {
  Input,
  Box,
  TablePagination,
} from '@mui/material';
import React from 'react';


function FilteredTable(props) {
  const { rows, columns, checkbox, rowClick } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');

  const [searches, setSearches] = React.useState(
    columns.map((column, index) => ({
      value: '',
      label: [column.label],
    }))
  );

  const handleSearchChange = (index) => (event) => {
    const newSearches = [...searches];
    console.log(newSearches[index].value);
    newSearches[index].value = event.target.value;
    setSearches(newSearches);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRowClick = (event, id) => {
    if (rowClick) {
      rowClick(id);
    }
  };


  return (
    <Box>
      <AdminTable
        rows={rows}
        columns={columns}
        checkbox={checkbox}
        searches={searches}
        handleSearchChange={handleSearchChange}
        order={order}
        orderBy={orderBy}
        handleRequestSort={handleRequestSort}
        handleRowClick={handleRowClick}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          marginleft: "auto",
          marginRight: "auto",
        }}
      />
    </Box>
  );
}

export default FilteredTable;