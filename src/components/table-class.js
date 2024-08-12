// src/components/ClassList.js

import React, { useEffect, useState } from "react";
import {
  Switch,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Toolbar,
  Box,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";
import { Add, Upload } from "@mui/icons-material";
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx'; // Thêm thư viện để xử lý file Excel

const initialClassData = [
  {
    id: 1,
    classCode: "L001",
    className: "Lớp Toán Cơ Bản",
    subject: "Toán học",
    classTime: "08:00 - 10:00 Thứ Hai, Thứ Tư",
    examTime: "14:00 - 16:00 Thứ Sáu",
    studentCount: 30,
    passRate: 85,
    status: true,
  },
  {
    id: 2,
    classCode: "L002",
    className: "Lớp Ngữ Văn Nâng Cao",
    subject: "Ngữ văn",
    classTime: "10:00 - 12:00 Thứ Ba, Thứ Năm",
    examTime: "09:00 - 11:00 Thứ Bảy",
    studentCount: 25,
    passRate: 90,
    status: false,
  },
  {
    id: 3,
    classCode: "L003",
    className: "Lớp Hóa Học Cơ Bản",
    subject: "Hóa học",
    classTime: "13:00 - 15:00 Thứ Hai, Thứ Sáu",
    examTime: "15:00 - 17:00 Thứ Năm",
    studentCount: 28,
    passRate: 80,
    status: true,
  },
  {
    id: 4,
    classCode: "L004",
    className: "Lớp Lịch Sử Việt Nam",
    subject: "Lịch sử",
    classTime: "08:00 - 10:00 Thứ Tư, Thứ Sáu",
    examTime: "13:00 - 15:00 Thứ Bảy",
    studentCount: 22,
    passRate: 75,
    status: true,
  },
  {
    id: 5,
    classCode: "L005",
    className: "Lớp Tin Học Văn Phòng",
    subject: "Tin học",
    classTime: "14:00 - 16:00 Thứ Hai, Thứ Tư",
    examTime: "10:00 - 12:00 Thứ Sáu",
    studentCount: 35,
    passRate: 92,
    status: false,
  },
];

const ClassList = ({ data }) => {
  const [classData, setClassData] = useState(initialClassData);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [datainit, setDataInit] = useState([]);
  useEffect(() => {
    if (data) {
      setDataInit(data);
    } else {
      setDataInit(initialClassData);
    }
  }, [data]);
  const handleEditClick = (row) => {
    setEditData(row);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDownloadClick = (row) => {
    const blob = new Blob([JSON.stringify(row, null, 2)], {
      type: "application/json",
    });
    // saveAs(blob, `${row.classCode}.json`);
  };

  const handleConfirmDelete = () => {
    setClassData(classData.filter((item) => item.id !== deleteId));
    setOpenDeleteDialog(false);
  };

  const handleSaveEdit = () => {
    setClassData(
      classData.map((item) => (item.id === editData.id ? editData : item))
    );
    setOpenEditDialog(false);
  };

  const handleAddNew = () => {
    setEditData({
      id: "",
      classCode: "",
      className: "",
      subject: "",
      classTime: "",
      examTime: "",
      studentCount: 0,
      passRate: 0,
      status: false,
    });
    setOpenEditDialog(true);
  };

  const handleFileUpload = (event) => {
    // const file = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const data = new Uint8Array(e.target.result);
    //   const workbook = XLSX.read(data, { type: 'array' });
    //   const sheet = workbook.Sheets[workbook.SheetNames[0]];
    //   const jsonData = XLSX.utils.sheet_to_json(sheet);
    //   setClassData(jsonData);
    // };
    // reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
        className="bg-white py-2 px-1 rounded shadow"
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Danh sách sinh viên
        </Typography>
        <Box>
          <Tooltip title="Thêm sinh viên thủ công">
            <IconButton color="primary" onClick={() => handleAddNew()}>
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Nhập từ Excel">
            <IconButton color="secondary" onClick={() => handleFileUpload()}>
              <Upload />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        className="mx-auto mt-2 max-w-full rounded-lg shadow-lg"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-blue-100">
              <TableCell className="font-semibold text-blue-700">
                Mã lớp
              </TableCell>
              <TableCell className="font-semibold text-blue-700">
                Tên lớp
              </TableCell>
              <TableCell className="font-semibold text-blue-700">
                Tên môn học
              </TableCell>
              <TableCell className="font-semibold text-blue-700">
                Thời gian học
              </TableCell>
              <TableCell className="font-semibold text-blue-700">
                Thời gian thi
              </TableCell>
              <TableCell className="font-semibold text-blue-700">
                Số lượng sinh viên
              </TableCell>
              <TableCell className="font-semibold text-blue-700">
                Tỉ lệ đạt (%)
              </TableCell>
              <TableCell className="font-semibold text-blue-700">
                Trạng thái
              </TableCell>
              <TableCell className="font-semibold text-blue-700">
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classData.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <TableCell className="py-4 px-6">{row.classCode}</TableCell>
                <TableCell className="py-4 px-6">{row.className}</TableCell>
                <TableCell className="py-4 px-6">{row.subject}</TableCell>
                <TableCell className="py-4 px-6">{row.classTime}</TableCell>
                <TableCell className="py-4 px-6">{row.examTime}</TableCell>
                <TableCell className="py-4 px-6">{row.studentCount}</TableCell>
                <TableCell className="py-4 px-6">{row.passRate}</TableCell>
                <TableCell className="py-4 px-6">
                  <Switch checked={row.status} />
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex space-x-2">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(row)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(row.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color="info"
                      onClick={() => handleDownloadClick(row)}
                      aria-label="download"
                    >
                      <DownloadIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Edit */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>
          {editData?.id ? "Chỉnh sửa lớp học" : "Thêm lớp học mới"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên lớp"
            type="text"
            fullWidth
            variant="standard"
            value={editData?.className || ""}
            onChange={(e) =>
              setEditData({ ...editData, className: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Tên môn học"
            type="text"
            fullWidth
            variant="standard"
            value={editData?.subject || ""}
            onChange={(e) =>
              setEditData({ ...editData, subject: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Thời gian học"
            type="text"
            fullWidth
            variant="standard"
            value={editData?.classTime || ""}
            onChange={(e) =>
              setEditData({ ...editData, classTime: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Thời gian thi"
            type="text"
            fullWidth
            variant="standard"
            value={editData?.examTime || ""}
            onChange={(e) =>
              setEditData({ ...editData, examTime: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Số lượng sinh viên"
            type="number"
            fullWidth
            variant="standard"
            value={editData?.studentCount || ""}
            onChange={(e) =>
              setEditData({ ...editData, studentCount: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Tỉ lệ đạt (%)"
            type="number"
            fullWidth
            variant="standard"
            value={editData?.passRate || ""}
            onChange={(e) =>
              setEditData({ ...editData, passRate: e.target.value })
            }
          />
          <Switch
            checked={editData?.status || false}
            onChange={(e) =>
              setEditData({ ...editData, status: e.target.checked })
            }
            // @ts-ignore
            label="Trạng thái"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveEdit} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Delete */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn xóa lớp học này?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClassList;
