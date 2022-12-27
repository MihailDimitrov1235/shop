import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTranslation } from 'react-i18next';

export default function DeleteDialog({ selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete() {
    // Send a delete request to the database for the selected rows
    selected.forEach(row => {
      console.log(row); // id
    });
    setOpen(false);
    setSelected([]);
  }

  return (
    <Box>
      <IconButton
        disabled={selected.length === 0}
        onClick={handleClickOpen}
      >
        <DeleteForeverIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete</DialogTitle>
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
  )};
