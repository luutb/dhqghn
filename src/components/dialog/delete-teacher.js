import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';

const DeleteInstructorDialog = ({ open, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xoá giảng viên</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteInstructorDialog;
