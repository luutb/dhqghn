import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Select,
  Chip,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const DialogEditPermission = ({
  openEditDialog,
  handleCloseEditDialog,
  editPermission,
  setEditPermission,
}) => {
  const [availableMembers, setAvailableMembers] = useState([]);
  const [availableRights, setAvailableRights] = useState([]);
  const handleUpdate = () => {};
  return (
    <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
      <DialogTitle>Chỉnh sửa quyền</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tên nhóm quyền"
          type="text"
          fullWidth
          variant="outlined"
          value={editPermission.name}
          onChange={(e) =>
            setEditPermission({ ...editPermission, name: e.target.value })
          }
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Thành viên</InputLabel>
          <Select
            multiple
            value={editPermission.members}
            onChange={(e) =>
              setEditPermission({ ...editPermission, members: e.target.value })
            }
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
            value={editPermission.rights}
            onChange={(e) =>
              setEditPermission({ ...editPermission, rights: e.target.value })
            }
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
        <Button onClick={handleCloseEditDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DialogEditPermission;
