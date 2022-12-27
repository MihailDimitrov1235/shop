import React from 'react';
import {
  Card,
  Box,
  Tooltip,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EnhancedTableHead from './EnhancedTableHead';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteDialog from './DeleteDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


function AdminTable(props) {
  const classes = useStyles();
  const { rows, columns, checkbox, rowClick, dense, searches, handleSearchChange, order, orderBy, handleRequestSort, handleRowClick } = props;
  const [selected, setSelected] = React.useState([]);

  
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  return (
    <div className={classes.root}>
      <Box display={"flex"} justifyContent='space-between'>
        <Box display={"flex"}>
          <Link to="/admin/products/create">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
          <DeleteDialog selected={selected} setSelected={setSelected} />
        </Box>
      </Box>
      <Table
        className={classes.table}
        aria-labelledby='tableTitle'
        size={dense ? 'small' : 'medium'}
      >
        <EnhancedTableHead
          searches={searches}
          handleSearchChange={handleSearchChange}
          checkbox={checkbox}
          classes={classes}
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
          headCells={columns}
        />
        <TableBody>
          {rows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleRowClick(event, row.id)}
                  role='checkbox'
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  {checkbox && (
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleClick(event, row.id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => {
                    const value = row[column.id];
                    console.log(row);
                    return (
                      <TableCell key={column.id} align={column.align} style={{ maxHeight: "20px", maxWidth: "40px", overflow: "hidden" }}>
                        <Tooltip title={value}>
                          <span>{value}</span>
                        </Tooltip>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );

}

export default AdminTable;
