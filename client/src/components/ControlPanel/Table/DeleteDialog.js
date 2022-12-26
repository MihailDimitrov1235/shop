import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Box } from '@mui/system';

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
