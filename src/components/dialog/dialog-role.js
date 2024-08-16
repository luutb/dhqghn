import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Chip } from '@mui/material';

const allRoles = [
  'Chỉnh sửa thông tin sinh viên',
  'Nhập điểm',
  'Lập lịch làm việc',
  'Thay đổi thông tin giảng viên'
];

const allInstructors = [
  { id: 'GV001', name: 'Nguyễn Văn A' },
  { id: 'GV002', name: 'Trần Thị B' },
  { id: 'GV003', name: 'Lê Văn C' },
  { id: 'GV004', name: 'Nguyễn Thị D' }
];

const EditPermissionDialog = ({ open, onClose, permission, onSave }) => {
  const [name, setName] = useState(permission.name);
  const [members, setMembers] = useState(permission.members);
  const [selectedRoles, setSelectedRoles] = useState([permission.role]);

  const handleSave = () => {
    onSave({ ...permission, name, role: selectedRoles[0], members });
  };

  const handleMemberChange = (event) => {
    setMembers(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRoles(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-gray-100 text-gray-800">Chỉnh sửa quyền</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tên quyền"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />

        <FormControl fullWidth margin="dense">
          <InputLabel>Quyền</InputLabel>
          <Select
            multiple
            value={selectedRoles}
            onChange={handleRoleChange}
            renderValue={(selected) => (
              <div className="flex flex-wrap gap-2">
                {selected.map((role) => (
                  <Chip key={role} label={role} className="bg-blue-500 text-white" />
                ))}
              </div>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
            className="border-gray-300"
          >
            {allRoles.map((role) => (
              <MenuItem key={role} value={role}>
                <Checkbox checked={selectedRoles.indexOf(role) > -1} />
                <ListItemText primary={role} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Thành viên</InputLabel>
          <Select
            multiple
            value={members}
            onChange={handleMemberChange}
            renderValue={(selected) => (
              <div className="flex flex-wrap gap-2">
                {selected.map((memberId) => {
                  const member = allInstructors.find(instructor => instructor.id === memberId);
                  return member ? <Chip key={memberId} label={member.name} className="bg-green-500 text-white" /> : null;
                })}
              </div>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
            className="border-gray-300"
          >
            {allInstructors.map((instructor) => (
              <MenuItem key={instructor.id} value={instructor.id}>
                <Checkbox checked={members.indexOf(instructor.id) > -1} />
                <ListItemText primary={instructor.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="text-gray-600">
          Hủy
        </Button>
        <Button onClick={handleSave} className="bg-blue-500 text-white hover:bg-blue-700">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPermissionDialog;
