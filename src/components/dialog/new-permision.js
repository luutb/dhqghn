import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";

const DialogAddPermission = ({openAddDialog, handleCloseAddDialog,handleAddNew}) => {
    const [availableMembers, setAvailableMembers] = useState([]);
    const [availableRights, setAvailableRights] = useState([]);

  const [newPermission, setNewPermission] = useState({
    name: "",
    members: [],
    rights: [],
  });



//   const handleAddNew = () => {
//     // Add new permission logic
//     setPermissions([
//       ...permissions,
//       { id: permissions.length + 1, ...newPermission },
//     ]);
//     handleCloseAddDialog();
//   };
  return (
    <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
          <DialogTitle>Thêm quyền mới</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Tên nhóm quyền"
              type="text"
              fullWidth
              variant="outlined"
              value={newPermission.name}
              onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Thành viên</InputLabel>
              <Select
                multiple
                value={newPermission.members}
                onChange={(e) => setNewPermission({ ...newPermission, members:[... e.target.value] })}
                renderValue={(selected) => (
                  <div className="flex flex-wrap">
                    {selected.map((value) => (
                      <Chip key={value} label={value} className="mr-2 mb-2" />
                    ))}
                  </div>
                )}
              >
                {availableMembers.map((member) => (
                  <MenuItem key={member} value={member}>
                    {member}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <InputLabel>Quyền</InputLabel>
              <Select
                multiple
                value={newPermission.rights}
                onChange={(e) => setNewPermission({ ...newPermission, rights: [...e.target.value] })}
                renderValue={(selected) => (
                  <div className="flex flex-wrap">
                    {selected.map((value) => (
                      <Chip key={value} label={value} className="mr-2 mb-2" />
                    ))}
                  </div>
                )}
              >
                {availableRights.map((right) => (
                  <MenuItem key={right} value={right}>
                    {right}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddNew} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
  );
};
export default DialogAddPermission;
