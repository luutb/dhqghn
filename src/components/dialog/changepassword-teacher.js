import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const ChangePasswordDialog = ({ open, onClose, onChangePassword }) => {
  const [password, setPassword] = useState('');

  const handleChangePassword = () => {
    onChangePassword(password);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thay đổi mật khẩu</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Mật khẩu mới"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleChangePassword} color="primary">
          Thay đổi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
