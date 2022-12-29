import {
    TableHead as MuiTableHead,
    TableRow,
    TableCell,
    Checkbox,
    TableSortLabel,
    Input,
    Box,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const TableHead = withStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.grey
    }
}))(MuiTableHead);

const EnhancedTableHead = ({
    headings,
    headFilters,
    options,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    classes: propClasses,
    onRequestSort,
    searches,
    handleSearchChange
}) => {
    const { t } = useTranslation();

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {options.checkbox && (
                    <TableCell padding='checkbox' sx={ Object.keys(headFilters).length > 0 && { border: 'none' } }>
                        <Checkbox
                            color='bordoRed'
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all items' }}
                        />
                    </TableCell>
                )}
                {headings.map((heading, index) => (
                    <TableCell
                        key={heading.id}
                        align={heading.numeric ? 'right' : 'left'}
                        padding={heading.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === heading.id ? order : false}
                        sx={ Object.keys(headFilters).length > 0 && { border: 'none' } }
                    >
                        {heading.order ?
                            (
                                <TableSortLabel
                                    active={orderBy === heading.id}
                                    direction={orderBy === heading.id ? order : 'asc'}
                                    onClick={createSortHandler(heading.id)}
                                >
                                    {heading.label}
                                    {orderBy === heading.id ? (
                                        <span className={propClasses.visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            ) :
                            (
                                heading.label
                            )
                        }

                        {/* {Object.keys(headFilters).length > 0 && (
                            <>
                                {headFilters[heading.id] && (
                                    <Box>
                                        {headFilters[heading.id].type === 'search' && (
                                            <Input
                                                placeholder={t('search-in') + [searches[index].label]}
                                                value={searches[index].value}
                                                onChange={handleSearchChange(index)}
                                            />
                                        )}
                                    </Box>
                                )}
                            </>
                        )} */}
                    </TableCell>
                ))}
                {options.edit && (
                    <TableCell sx={ Object.keys(headFilters).length > 0 && { border: 'none' } }></TableCell>
                )}
                {options.delete && (
                    <TableCell sx={ Object.keys(headFilters).length > 0 && { border: 'none' } }></TableCell>
                )}
            </TableRow>
        </TableHead>
    );
};

EnhancedTableHead.propTypes = {
    headings: PropTypes.array.isRequired
}

export default EnhancedTableHead;