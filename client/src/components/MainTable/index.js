import { useState, useEffect } from 'react';
import {
    Box,
    Tooltip,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Checkbox,
    IconButton,
    Button,
    TextField,
    Chip,
    TableContainer,
    Grid,
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EnhancedTableHead from './EnhancedTableHead';
import DeleteDialog from './DeleteDialog';
import PropTypes from 'prop-types';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const FiltersTableRow = withStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.grey
    }
}))(TableRow);

const MainTable = ({
    rows,
    total,
    headings,
    headFilters = {},
    method,
    editHandler,
    deleteHandler,
    options = {
        checkbox: false,
        add: false,
        delete: false,
        edit: false
    },
    dense,
    rowClick
}) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation();

    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();
    const [searches, setSearches] = useState(
        headings.map((heading, index) => ({
            value: '',
            label: heading.id,
        }))
    );
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [allColsNum, setAllColsNum] = useState(headings.length);

    const newRequest = () => {
        method(page + 1, rowsPerPage, searches, { field: orderBy, direction: order });
    }

    useEffect(() => {
        newRequest();

        let colsNum = headings.length;

        if (options.delete) {
            colsNum++;
        }

        if (options.edit) {
            colsNum++;
        }

        if (options.checkbox) {
            colsNum++;
        }

        setAllColsNum(colsNum);
    }, [page, rowsPerPage, searches, order, orderBy, i18n.language])


    const handleSearchChange = (index) => (event) => {
        const newSearches = [...searches];
        newSearches[index].value = event.target.value;
        setSearches(newSearches);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        const direction = isAsc ? 'desc' : 'asc';
        setOrder(direction);
        setOrderBy(property);
    };

    const handleRowClick = (event, id) => {
        if (rowClick) {
            rowClick(id);
        }
    };

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

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    }

    const handleDeleteClick = (id) => {
        setOpenDeleteDialog(true);
        setDeleteId(id)
    }

    return (
        <Box>
            {(options.delete || options.add) && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3 }}>
                    {options.delete && (
                        <>
                            <Button
                                variant="outlined"
                                color="bordoRed"
                                textcolor="bordoRed"
                                disabled={selected.length === 0}
                                onClick={handleOpenDeleteDialog}
                            >
                                {t('delete-selected')}
                            </Button>

                            <DeleteDialog
                                selected={selected}
                                setSelected={setSelected}
                                deleteId={deleteId}
                                setDeleteId={setDeleteId}
                                deleteHandler={deleteHandler}
                                newRequest={newRequest}
                                open={openDeleteDialog}
                                setOpen={setOpenDeleteDialog}
                            />
                        </>
                    )}
                    {options.add && (
                        <Button
                            component={RouterLink}
                            variant="contained"
                            color="bordoRed"
                            textcolor="bordoRed"
                            startIcon={<AddIcon />}
                            to="create"
                        >
                            {t('add')}
                        </Button>
                    )}

                </Box>
            )}
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby='tableTitle'
                    size={dense ? 'small' : 'medium'}
                >
                    <EnhancedTableHead
                        searches={searches}
                        handleSearchChange={handleSearchChange}
                        options={options}
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                        headings={headings}
                        headFilters={headFilters}
                    />
                    <TableBody>
                        {Object.keys(headFilters).length > 0 && (
                            <FiltersTableRow>
                                {options.checkbox && (
                                    <TableCell></TableCell>
                                )}

                                {headings.map((heading, index) => {
                                    if (headFilters[heading.id]) {
                                        return (
                                            <TableCell key={heading.id} sx={{ pt: 0.5 }}>
                                                {headFilters[heading.id].type === 'search' && (
                                                    <TextField
                                                        placeholder={headFilters[heading.id].placeholder}
                                                        value={searches[index].value}
                                                        onChange={handleSearchChange(index)}
                                                        size='small'
                                                        fullWidth
                                                        sx={{ backgroundColor: 'white' }}
                                                        color='bordoRed'
                                                    />
                                                )}
                                            </TableCell>
                                        );
                                    } else {
                                        return <TableCell key={heading.id} sx={{ pt: 0.5 }}></TableCell>
                                    }
                                })}

                                {options.edit && (
                                    <TableCell></TableCell>
                                )}

                                {options.delete && (
                                    <TableCell></TableCell>
                                )}
                            </FiltersTableRow>
                        )}

                        {rows.length > 0 ? (
                            <>
                                {rows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    console.log(row);


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
                                            {options.checkbox && (
                                                <TableCell padding='checkbox'>
                                                    <Checkbox
                                                        color='bordoRed'
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                        onClick={(event) => event.stopPropagation()}
                                                        onChange={(event) => handleClick(event, row.id)}
                                                    />
                                                </TableCell>
                                            )}
                                            {headings.map((heading) => {
                                                const value = row[heading.id];

                                                if (Array.isArray(value)) {
                                                    return (
                                                        <TableCell key={heading.id} align={heading.align} style={{ maxHeight: "20px", overflow: "hidden" }}>
                                                            <Grid container spacing={1}>

                                                                {value.map((element) => {
                                                                    const name = element[heading.arrayId][heading.selector];
                                                                    console.log(typeof (name));
                                                                    return (
                                                                        <Grid item>
                                                                            <Tooltip title={name}>
                                                                                <Chip label={name} sx={{ maxWidth: '150px' }} />
                                                                            </Tooltip>
                                                                        </Grid>
                                                                    );
                                                                })}

                                                            </Grid>
                                                        </TableCell>
                                                    );
                                                } else {

                                                    return (
                                                        <TableCell key={heading.id} align={heading.align} style={{ maxHeight: "20px", overflow: "hidden" }}>
                                                            <Tooltip title={value}>
                                                                <span>{value}</span>
                                                            </Tooltip>
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                            {options.edit && (
                                                <TableCell align='right'>
                                                    <RouterLink to={`edit/${row.id}`}>
                                                        <IconButton>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </RouterLink>
                                                </TableCell>
                                            )}
                                            {options.delete && (
                                                <TableCell align='right'>
                                                    <IconButton color='error' onClick={() => handleDeleteClick(row['id'])}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    );
                                })}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={allColsNum} sx={{ textAlign: 'center' }}>{t('no-records')}</TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
            </TableContainer>
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
};

MainTable.propTypes = {
    rows: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    headings: PropTypes.array.isRequired,
    headFilters: PropTypes.object,
    method: PropTypes.func.isRequired,
    editHandler: PropTypes.func,
    deleteHandler: PropTypes.func,
    options: PropTypes.shape({
        checkbox: PropTypes.bool,
        add: PropTypes.bool,
        delete: PropTypes.bool,
        edit: PropTypes.bool
    })
}

export default MainTable;