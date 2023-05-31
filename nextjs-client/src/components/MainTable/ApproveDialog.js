import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';

const ApproveDialog = ({
    approveId,
    setApproveId,
    approveHandler,
    newRequest,
    open,
    setOpen
}) => {
    const { t } = useTranslation();

    function handleClose() {
        setOpen(false);
    }

    function handleApprove() {
        approveHandler([approveId]);
        if(setApproveId){
            setApproveId(0);
        }
        if(newRequest){
            newRequest();
        }
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{t('approve')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('approve-msg')}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit">
                    {t('cancel')}
                </Button>
                <Button onClick={handleApprove} color="error">
                    {t('approve')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

ApproveDialog.propTypes = {
    approveId: PropTypes.number.isRequired,
    setApproveId: PropTypes.func.isRequired,
    approveHandler: PropTypes.func.isRequired,
    newRequest: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
}

export default ApproveDialog;