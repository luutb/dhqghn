

"use client"
import React, { useState } from 'react';
import { Container, Paper, Typography, Avatar, Box, IconButton, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { format } from 'date-fns';

const studentProfile = {
  id: '123456',
  fullname: 'Nguyen Van A',
  dob: '2000-01-01',
  address: 'Hanoi, Vietnam',
  status: 'Đã qua', // Hoặc 'Chưa qua'
  avatarUrl: 'https://i.pravatar.cc/150?img=1' // Thay đổi URL avatar nếu cần
};

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [newProfile, setNewProfile] = useState(studentProfile);
  const [openPhotoDialog, setOpenPhotoDialog] = useState(false);
  const [newAvatar, setNewAvatar] = useState(studentProfile.avatarUrl);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    // Lưu thông tin đã chỉnh sửa (giả lập)
    console.log('Thông tin đã được lưu:', newProfile);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setNewProfile(studentProfile);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatar(reader.result.toString());
        setOpenPhotoDialog(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className="py-4">
      <Paper elevation={3} className="p-4 bg-white shadow-lg">
        <Box className="flex flex-col items-center">
          {/* Avatar and Edit Photo Button */}
          <Box className="relative mb-4">
            <Avatar
              src={newAvatar}
              alt={newProfile.fullname}
              sx={{ width: 80, height: 80 }}
            />
            <IconButton
              className="absolute bottom-0 right-0"
              color="primary"
              onClick={() => setOpenPhotoDialog(true)}
              sx={{ width: 24, height: 24, p: 0.5 }}
            >
              <PhotoCameraIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Edit Button */}
          <Box className="flex items-center mb-4">
            <Typography variant="h6" className="font-semibold mr-2">
              {newProfile.fullname}
            </Typography>
            <IconButton color="primary" onClick={handleEditClick} sx={{ width: 24, height: 24 }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Information Display */}
          <Box className="w-full">
            <Typography variant="body2" className="text-gray-700 mb-1">
              <strong>Mã sinh viên:</strong> {newProfile.id}
            </Typography>
            <Typography variant="body2" className="text-gray-700 mb-1">
              <strong>Ngày sinh:</strong> {format(new Date(newProfile.dob), 'dd/MM/yyyy')}
            </Typography>
            <Typography variant="body2" className="text-gray-700 mb-1">
              <strong>Quê quán:</strong> {newProfile.address}
            </Typography>
            <Typography variant="body2" className="text-gray-700 mb-1">
              <strong>Tình trạng:</strong> {newProfile.status}
            </Typography>
          </Box>

          {/* Edit Dialog */}
          <Dialog open={editing} onClose={() => setEditing(false)}>
            <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Họ và tên"
                type="text"
                fullWidth
                variant="standard"
                value={newProfile.fullname}
                onChange={(e) => setNewProfile({ ...newProfile, fullname: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Ngày sinh"
                type="date"
                fullWidth
                variant="standard"
                InputLabelProps={{ shrink: true }}
                value={newProfile.dob}
                onChange={(e) => setNewProfile({ ...newProfile, dob: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Quê quán"
                type="text"
                fullWidth
                variant="standard"
                value={newProfile.address}
                onChange={(e) => setNewProfile({ ...newProfile, address: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Tình trạng"
                type="text"
                fullWidth
                variant="standard"
                value={newProfile.status}
                onChange={(e) => setNewProfile({ ...newProfile, status: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelClick}>Hủy</Button>
              <Button onClick={handleSaveClick}>Lưu</Button>
            </DialogActions>
          </Dialog>

          {/* Photo Upload Dialog */}
          <Dialog open={openPhotoDialog} onClose={() => setOpenPhotoDialog(false)}>
            <DialogTitle>Chọn ảnh đại diện</DialogTitle>
            <DialogContent>
              <input
                accept="image/*"
                type="file"
                id="upload-photo"
                style={{ display: 'none' }}
                onChange={handlePhotoUpload}
              />
              <label htmlFor="upload-photo">
                <Button variant="contained" component="span">
                  Chọn ảnh
                </Button>
              </label>
            </DialogContent>
          </Dialog>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
