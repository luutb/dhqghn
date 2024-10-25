"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Paper,
  Container,
  Box,
  Toolbar,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  GetApp as GetAppIcon,
  Add as AddIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import axiosInstance from "@/axios/api-config";
import { courses, downloadCourse, updateStatusCourse, uploadCourse } from "@/axios/endpoints";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// Sample data
const exams = [
  {
    id: 1,
    codeCourse: "CS101",
    nameCode: "Giới thiệu lập trình",
    date: "2024-08-30",
    semester: "Kỳ 1 <2023-2024>",
    nameSchool: "Trường Đại học ABC",
    status: true,
    count: 30,
  },
  // Add more items here
];

function TableCourse() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [coursesState, setCourses] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    uploadFile(e.target.files[0]);
  };
  const router = useRouter();
  const handleDeleteClick = (exam) => {
    setSelectedExam(exam);
    setOpenDeleteDialog(true);
  };
  useEffect(() => {
    if (refresh) {
      axiosInstance
        .get(courses)
        .then((response) => {
          if (response && response.data && response.data.data) {
            setCourses([...response.data.data]);
          }
        })
        .finally(() => {
          setRefresh(false);
        });
    }
  }, [refresh]);
  const handleDownloadClick = (id) => {
    // const ws = XLSX.utils.json_to_sheet(exams);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Exams');
    // const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    // saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'exams.xlsx');
    axiosInstance.get(downloadCourse + "?id=" + id).then((response) => {
      if (response && response.data) {
        window.open("http://localhost:3200/export.xlsx")
      }
    });
  };
  const navigationCourse = (id) => {
    router.push("/quan-ly-thi/" + id);
  };

  const handleSwitchCase = (id) => {
    axiosInstance.put(updateStatusCourse + "?id=" + id).then((response) => {
      if (response && response.data) {
        toast.success("Cập nhật trạng thái thành công");
        setRefresh(true);
      }
    });
  };
  const handleConfirmDelete = () => {
    // Implement delete functionality here
    deleteCourse(selectedExam.id)
    setOpenDeleteDialog(false);
  };

  const deleteCourse = (id) =>{
    axiosInstance.delete(`/api/v1/courses?id=${id}`).then((res)=>{
      if(res.data && res.data.error == 200){
        toast.success("Xoá thành công thành công");
        setRefresh(true);

      }
      else{
        toast.success("Đã có sự cố! Vui lòng thử lại");
      }
    })
  }
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const uploadFile = async (_file) => {
    console.log("_file",_file)
    if (!_file) {
      console.log("_file")
      return;
    }
    const formData = new FormData();
    formData.append("course", _file);
    try {
      axiosInstance.post(uploadCourse, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response && response.data) {
          toast.success("Cập nhật trạng thái thành công");
          setRefresh(true);
        }
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="w-full">
      <Box>
        <Paper elevation={3} className="p-4 bg-white">
          <Toolbar>
            <Typography
              variant="h4"
              component="h1"
              sx={{ flexGrow: 1, color: "#1976d2" }}
            >
              Quản lý phòng thi
            </Typography>
            <Box>
              <IconButton
                color="primary"
                onClick={() => console.log("Add new exam")}
                sx={{ mr: 1 }}
              >
                <AddIcon />
              </IconButton>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }} // Ẩn input file
                onChange={handleFileChange}
              />
              <IconButton
                color="primary"
                onClick={() => fileInputRef.current.click()}
                sx={{ mr: 1 }}
              >
                <UploadIcon />
              </IconButton>
            </Box>
          </Toolbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Mã lớp</TableCell>
                  <TableCell>Mã môn</TableCell>
                  <TableCell>Tên môn</TableCell>
                  <TableCell>Ngày thi</TableCell>
                  <TableCell>Kì học</TableCell>
                  <TableCell>Tên trường học</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Số lượng sinh viên</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coursesState.map((exam, index) => (
                  <TableRow key={exam.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{exam.codeCourse}</TableCell>
                    <TableCell>{exam.codeCourse}</TableCell>
                    <TableCell>{exam.nameCode}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>{exam.semester}</TableCell>
                    <TableCell>{exam.nameSchool}</TableCell>
                    <TableCell>
                      <Switch
                        checked={exam.status}
                        color="secondary"
                        onChange={() => {
                          handleSwitchCase(exam.id);
                        }}
                      />
                    </TableCell>
                    <TableCell>{exam.students.length}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => navigationCourse(exam.id)}
                        color="info"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(exam)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() =>{handleDownloadClick(exam.id)}} color="success">
                        <GetAppIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Xóa Môn Học</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa môn học {selectedExam?.nameCode}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TableCourse;
