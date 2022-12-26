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

export default function DeleteDialog({ selected, setSelected }) {
  const [open, setOpen] = useState(false);

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
            Are you sure you want to delete {selected.length} rows?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
        Delete
            </Button>
            </DialogActions>
        </Dialog>
    </Box>
  )};
