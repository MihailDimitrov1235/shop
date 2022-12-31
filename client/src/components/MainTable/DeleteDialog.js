import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const DeleteDialog = ({ selected, setSelected, deleteHandler, newRequest }) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleDelete() {
        deleteHandler(selected);
        newRequest();

        setOpen(false);
        setSelected([]);
    }

    return (
        <Box>
            <Button
                variant="outlined"
                color="bordoRed"
                textcolor="bordoRed"
                disabled={selected.length === 0}
                onClick={handleClickOpen}
            >
                {t('delete-selected')}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{t('delete')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('delete-msg')} {selected.length} {t('rows')}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        {t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

DeleteDialog.propTypes = {
    selected: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    newRequest: PropTypes.func.isRequired
}

export default DeleteDialog;