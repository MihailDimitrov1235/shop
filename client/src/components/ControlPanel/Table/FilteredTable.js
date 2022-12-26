import AdminTable from "./AdminTable";
import {
  Input,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';


function FilteredTable(props) {
  const { rows, columns, checkbox } = props;

  const [searchQuery, setSearchQuery] = useState(null);
  const [searchColumn, setSearchColumn] = useState("id");

  function getFilteredRows() {
    if (searchColumn != null && searchQuery != null) {
      let result = [];
      rows.forEach(row => {
        let value = row[searchColumn];
        if (Array.isArray(value)) {
          value = value.sort().join(', ');
        } else if (typeof value !== 'string') {
          value = value.toString();
        }
        if (value.toLowerCase().includes(searchQuery.toLowerCase())) {
          result.push(row);
        }
      });
      return result;
    } else {
      return rows;
    }
  }
  const FilteredRows = getFilteredRows();

  return (
    <Box>
      <Input
        placeholder="Search..."
        value={searchQuery || ''}
        onChange={(event) => setSearchQuery(event.target.value)}
        color="bordoRed"
        endAdornment={
          <Box>
            <Select
              value={searchColumn || 'id'}
              onChange={(event) => setSearchColumn(event.target.value)}
            >
              {props.columns.map((column, index) => {
                const value = column.label;
                console.log(column.label);
                return (
                  <MenuItem value={column.id} key={index}>{value}</MenuItem>
                );
              })}
            </Select>
          </Box>
        }
      />
      <AdminTable
        rows={FilteredRows}
        columns={columns}
        checkbox={checkbox}
      />
    </Box>
  );
}

export default FilteredTable;