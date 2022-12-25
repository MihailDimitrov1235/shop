import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Checkbox
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EnhancedTableHead from './EnhancedTableHead';
import { stableSort, getComparator } from './utils';
import { useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Box } from '@mui/material';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteDialog from './DeleteDialog';




const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    textAlign:"center",
  }
  
});

function createData(id, name, authorIds, shortDescription, longDescription, categoryIds, parts, createdAt, updatedAt) {
  return { id, name, authorIds, shortDescription, longDescription, categoryIds, parts, createdAt, updatedAt };
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

export default function ProductTable() {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState(null);
    const [searchColumn, setSearchColumn] = useState("id");
  
    const handleCheckboxClick = (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    function handleSelectAllClick(event) {
      const { checked } = event.target;
      if (checked) {
        const newSelected = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => row.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    }
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };


    function getNumSelectedRowsOnCurrentPage() {
      const selectedRowsOnCurrentPage = selected.filter((id) => {
        const index = rows.findIndex((row) => row.id === id);
        return index >= page * rowsPerPage && index < (page + 1) * rowsPerPage;
      });
      return selectedRowsOnCurrentPage.length;
    }

    const sortedRows = stableSort(rows, getComparator(order, orderBy))
    .filter((row) => {
      if (searchQuery == null || searchColumn == null) {
        return true;
      }
      // Check if the value of the selected column contains the search query
      let value = row[searchColumn];
      if (Array.isArray(value)) {
        value = value.sort().join(', ');
      } else if (typeof value !== 'string') {
        value = value.toString();
      }
      return value.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <Box>
      <Box display={"flex"} justifyContent='space-between'>
        <Input
          placeholder="Search..."
          value={searchQuery || ''}
          onChange={(event) => setSearchQuery(event.target.value)}
          endAdornment={
            <Box>
              <Select
                value={searchColumn || 'id'}
                onChange={(event) => setSearchColumn(event.target.value)}
              >
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="authorIds">Author IDs</MenuItem>
                <MenuItem value="shortDescription">Short Description</MenuItem>
                <MenuItem value="longDescription">Long Description</MenuItem>
                <MenuItem value="categoryIds">Category IDs</MenuItem>
                <MenuItem value="parts">Parts</MenuItem>
                <MenuItem value="createdAt">Created At</MenuItem>
                <MenuItem value="updatedAt">Updated At</MenuItem>
              </Select>
              </Box>
          }
        />
        <Box display={"flex"}>
          <Link to="/admin/products/create">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
          <DeleteDialog selected={selected} setSelected={setSelected} />
        </Box>  
      </Box>
    <Box>
    <Table className={classes.table} aria-label="product table" style={{ width: '100%' }}>
      <EnhancedTableHead
        classes={classes}
        numSelected={getNumSelectedRowsOnCurrentPage()}
        order={order}
        orderBy={orderBy}
        onSelectAllClick={handleSelectAllClick}
        onRequestSort={handleRequestSort}
        rowCount={rowsPerPage}
      />
      <TableBody>
        {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
          const isSelected = selected.indexOf(row.id) !== -1;
          return (
            <TableRow key={row.id} selected={isSelected}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  onChange={(event) => handleCheckboxClick(event, row.id)}
                  color="default"
                />
              </TableCell>
              <TableCell className={classes.tableCell} component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell className={classes.tableCell} style={{ maxWidth: '1.5em', maxHeight: '1.5em', overflow: 'hidden' }} >{row.name}</TableCell>
              <TableCell className={classes.tableCell} >{row.authorIds.join(', ')}</TableCell>
              <TableCell className={classes.tableCell} style={{ maxWidth: '1.5em', maxHeight: '1.5em', overflow: 'hidden' }}>
                <Tooltip title={row.shortDescription}>
                  <span>{row.shortDescription}</span>
                </Tooltip>
              </TableCell>
              <TableCell className={classes.tableCell} style={{ maxWidth: '1.5em', maxHeight: '1.5em', overflow: 'hidden' }} >
                <Tooltip title={row.longDescription}>
                  <span>{row.longDescription}</span>
                </Tooltip>
              </TableCell>
              <TableCell className={classes.tableCell} >{row.categoryIds.join(', ')}</TableCell>
              <TableCell className={classes.tableCell} >{row.parts}</TableCell>
              <TableCell className={classes.tableCell} >{row.createdAt}</TableCell>
              <TableCell className={classes.tableCell} >{row.updatedAt}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
    <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        sx={{
          marginleft:"auto",
          marginRight:"auto",
        }}
      />
      </Box>
    </Box>
  );
}