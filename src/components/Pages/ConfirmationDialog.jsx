import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

function ConfirmationDialog({ open, onConfirm, onCancel, message }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <p>{message || 'Are you sure you want to proceed?'}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" variant="contained">
          No
        </Button>
        <Button onClick={onConfirm} color="success" variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
