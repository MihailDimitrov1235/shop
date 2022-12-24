import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import EnhancedTableHead from './EnhancedTableHead';
import { stableSort, getComparator } from './utils';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, name, shortDescription, longDescription, categoryIds, parts, createdAt, updatedAt) {
  return { id, name, shortDescription, longDescription, categoryIds, parts, createdAt, updatedAt };
}

const rows = [
  createData(1, 'Product 1', 'Short description 1', 'Long description 1', [1, 2, 3], 10, '2022-01-01', '2022-01-02'),
  createData(2, 'Product 2', 'Short description 2', 'Long description 2', [4, 5], 20, '2022-01-03', '2022-01-04'),
  // Add more rows as needed
];

export default function ProductTable() {
    const classes = useStyles();
    const [selected, setSelected] = React.useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
  
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
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((row) => row.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const sortedRows = stableSort(rows, getComparator(order, orderBy));

  return (
    <Table className={classes.table} aria-label="product table">
      <EnhancedTableHead
        classes={classes}
        numSelected={selected.length}
        order={order}
        orderBy={orderBy}
        onSelectAllClick={handleSelectAllClick}
        onRequestSort={handleRequestSort}
        rowCount={rows.length}
      />
      <TableBody>
        {sortedRows.map((row) => {
          const isSelected = selected.indexOf(row.id) !== -1;
          return (
            <TableRow key={row.id} selected={isSelected}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  onChange={(event) => handleCheckboxClick(event, row.id)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Tooltip title={row.shortDescription}>
                  <span>{row.shortDescription}</span>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={row.longDescription}>
                  <span>{row.longDescription}</span>
                </Tooltip>
              </TableCell>
              <TableCell>{row.categoryIds.join(', ')}</TableCell>
              <TableCell>{row.parts}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}