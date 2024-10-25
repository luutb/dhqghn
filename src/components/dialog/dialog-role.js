import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
} from "@mui/material";
import axiosInstance from "@/axios/api-config";
import { roles, teachers } from "@/axios/endpoints";

const allRoles = [
  "Chỉnh sửa thông tin sinh viên",
  "Nhập điểm",
  "Lập lịch làm việc",
  "Thay đổi thông tin giảng viên",
];

const EditPermissionDialog = ({ open, onClose, permission, onSave }) => {
  console.log("permission", permission);
  const [name, setName] = useState(permission?.nameRole ?? "");
  const [code, setCode] = useState(permission?.code ?? "");
  const [members, setMembers] = useState(permission?.members ?? []);
  
  const [instructors, setInstructors] = useState(null);
  useEffect(() => {
    axiosInstance.get(teachers).then((response) => {
      if (response && response.data && response.data.error === 200) {
        setInstructors(response.data.data);
      } else {
      }
    });
  }, []);

  const handleSave = () => {
    console.log("111111")
    let body = {
      
      name: name,
      members: members,
      code:code
    }
    if(permission && permission?.id){
      console.log("permission")
      axiosInstance.put(roles,{...body,id: permission.id}).then((response) => {
        if (response && response.data && response.data.error === 200) {
          onClose()
          window.location.reload();
        } else {
        }
      });
    }
    else{
      console.log("permission222")
      axiosInstance.post(roles,body).then((response) => {
        if (response && response.data && response.data.error === 200) {
          onClose()
          window.location.reload();
        } else {
        }
      });
    }
    
  };
  console.log("members", members);
  const handleMemberChange = (_member) => {
    const _id = members.findIndex((member) => member.id === _member.id);
    console.log();
    if (_id > -1) {
      members.splice(_id, 1);
      setMembers([...members]);
    } else {
      members.push(_member);
      setMembers([...members]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="bg-gray-100 text-gray-800">
        Chỉnh sửa quyền
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Mã quyền"
          type="text"
          fullWidth
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mb-4"
        />
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

        {/* <FormControl fullWidth margin="dense">
          <InputLabel>Quyền</InputLabel>
          <Select
            multiple
            value={selectedRoles}
            onChange={handleRoleChange}
            renderValue={(selected) => (
              <div className="flex flex-wrap gap-2">
                {selected.map((role) => (
                  <Chip
                    key={role}
                    label={role}
                    className="bg-blue-500 text-white"
                  />
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
        </FormControl> */}

        <FormControl fullWidth margin="dense">
          <InputLabel>Thành viên</InputLabel>
          <Select
            multiple
            value={members}
            // onChange={handleMemberChange}
            renderValue={(selected) => (
              <div className="flex flex-wrap gap-2">
                {selected.map((memberId) => {
                  return (
                    <Chip
                      key={memberId}
                      label={memberId.fullname}
                      className="bg-green-500 text-white"
                    />
                  );
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
            {instructors?.map((instructor) => (
              <MenuItem
                key={instructor.id}
                value={instructor.id}
                onClick={() => handleMemberChange(instructor)}
              >
                <Checkbox
                  checked={
                    members?.findIndex(
                      (member) => member.id === instructor.id
                    ) > -1
                  }
                />
                <ListItemText primary={instructor.fullname} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="text-gray-600">
          Hủy
        </Button>
        <Button
          onClick={handleSave}
          className="bg-blue-500 text-white hover:bg-blue-700"
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPermissionDialog;
