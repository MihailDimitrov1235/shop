import AdminTable from "./AdminTable";
import {
  Input,
  Box,
  TablePagination,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


function FilteredTable({
  rows,
  total = rows.length,
  newRequest,
  columns,
  checkbox,
  editOption = false,
  deleteOption = false,
  rowClick 
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const { t } = useTranslation();

  const [searches, setSearches] = useState(
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
        editOption={editOption}
        deleteOption={deleteOption}
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
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={t("rows-per-page")}
        sx={{
          marginleft: "auto",
          marginRight: "auto",
        }}
      />
    </Box>
  );
}

export default FilteredTable;