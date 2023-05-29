import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Pagination as PaginationMUI
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

const Pagination = ({
    total,
    page,
    setPage,
    rows,
    setRows
}) => {

    const { t } = useTranslation()
    const handleRowsChange = (event) => {
        setRows(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', float: 'right', mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography component='span'>
                    {t('elements-on-page')}:
                </Typography>
                <FormControl variant='standard' size='small'>
                    <Select
                        value={rows}
                        onChange={handleRowsChange}
                        autoWidth
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <PaginationMUI
                count={Math.ceil(total / rows) || 1}
                color='primary'
                page={page}
                onChange={handlePageChange}
            />
        </Box>
    );
};

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    rows: PropTypes.number.isRequired,
    setRows: PropTypes.func.isRequired
}

export default Pagination;