import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Avatar from "react-avatar";
import { styled } from "@mui/material/styles";
import axiosInstance from "@/axios/api-config";
import { departments, teacher } from "@/axios/endpoints";

// const departments = [
//   'Khoa CNTT',
//   'Khoa Toán',
//   'Khoa Vật Lý',
//   'Khoa Hóa Học'
//   // Add more departments here
// ];

const types = [
  { value: 1, label: "Giảng viên Cơ hữu" },
  { value: 2, label: "Giảng viên Thỉnh giảng" },
];

const CameraIcon = styled("i")(({ theme }) => ({
  fontSize: "24px",
  color: theme.palette.primary.main,
  position: "absolute",
  bottom: "10px",
  right: "10px",
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  padding: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
}));

const EditInstructorDialog = ({ open, onClose, instructor, onSave }) => {
  const [name, setName] = useState(instructor.fullname);
  const [department, setDepartment] = useState(instructor.department);
  const [type, setType] = useState(instructor.type);
  const [avatar, setAvatar] = useState(instructor.avatar || null);
  const [file, setFile] = useState(null);
  const [lstdepartment, setDepartments] = useState([]);
  useEffect(() => {
    axiosInstance.get(departments).then((response) => {
      if (response && response.data && response.data.error === 200) {
        setDepartments(response.data.data);
      } else {
      }
    });
  }, []);
  const submit = () => {
    let body = { ...instructor, department: department.name , fullname: name, };
    console.log("body",body)
    axiosInstance
      .post(teacher,body)
      .then((response) => {
        if (response && response.data && response.data.error === 200) {
          window.location.reload();
        } else {
        }
      })
      .finally(() => {
        onClose();
      });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(file);
        setAvatar(reader.result); // Update the avatar with the file URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ ...instructor, name, department, type, avatar });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Chỉnh sửa thông tin giảng viên</DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center mb-4 relative">
          <div className="relative">
            <Avatar src={avatar} name={name} size="100" round={true} />
            <label htmlFor="avatar-upload">
              <CameraIcon className="fas fa-camera" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <TextField
          autoFocus
          margin="dense"
          label="Tên giảng viên"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Phòng ban</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            label="Phòng ban"
          >
            {lstdepartment.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>Loại giảng viên</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Loại giảng viên"
          >
            {types.map((typeOption) => (
              <MenuItem key={typeOption.value} value={typeOption.value}>
                {typeOption.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={submit} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditInstructorDialog;