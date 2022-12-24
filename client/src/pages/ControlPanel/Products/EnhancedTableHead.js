import React from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  TableSortLabel
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
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

const headCells = [
  { id: 'id', numeric: true, disablePadding: false, label: 'Product ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Product Name' },
  { id: 'shortDescription', numeric: false, disablePadding: false, label: 'Short Description' },
  { id: 'longDescription', numeric: false, disablePadding: false, label: 'Long Description' },
  { id: 'categoryIds', numeric: false, disablePadding: false, label: 'Category IDs' },
  { id: 'parts', numeric: true, disablePadding: false, label: 'Parts' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
  { id: 'updatedAt', numeric: false, disablePadding: false, label: 'Updated At' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  export default EnhancedTableHead;