import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel
} from '@mui/material';
import {
  Input,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

function EnhancedTableHead(props) {
  const { searches, handleSearchChange, checkbox, editOption, deleteOption, classes: propClasses, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        {checkbox && (
          <TableCell padding='checkbox'>
            <Checkbox
              color='bordoRed'
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all items' }}
            />
          </TableCell>
        )}
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={propClasses.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
            <Box>
              <Input
              placeholder={t('search-in') + [searches[index].label]}
              value={searches[index].value}
              onChange={handleSearchChange(index)}
              />
            </Box>
          </TableCell>
        ))}
        {editOption && (
          <TableCell></TableCell>
        )}
        {deleteOption && (
          <TableCell></TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;