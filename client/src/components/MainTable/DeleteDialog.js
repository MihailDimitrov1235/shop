import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const DeleteDialog = ({
    selected,
    setSelected,
    deleteId,
    setDeleteId,
    deleteHandler,
    newRequest,
    open,
    setOpen
}) => {
    const { t } = useTranslation();

    function handleClose() {
        setOpen(false);
        setDeleteId(0);
    }

    function handleDelete() {
        if(deleteId) {
            deleteHandler([deleteId]);
            setDeleteId(0);
        }else {
            deleteHandler(selected);
            setSelected([]);
        }
        
        newRequest();
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{t('delete')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('delete-msg')}?
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
    )
}

DeleteDialog.propTypes = {
    selected: PropTypes.array.isRequired,
    setSelected: PropTypes.func.isRequired,
    deleteId: PropTypes.number.isRequired,
    setDeleteId: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    newRequest: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}

export default DeleteDialog;