"use client";
import React, { useEffect, useState } from "react";
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
import { courses, updateStatusCourse } from "@/axios/endpoints";
import { toast } from 'react-toastify';
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
  const router = useRouter();
  const handleDeleteClick = (exam) => {
    setSelectedExam(exam);
    setOpenDeleteDialog(true);
  };
  useEffect(() => {
   if(refresh){
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
  const handleDownloadClick = () => {
    // const ws = XLSX.utils.json_to_sheet(exams);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Exams');
    // const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    // saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'exams.xlsx');
  };
  const navigationCourse = (id) =>{
    console.log("chay vao day")
    router.push("/quan-ly-thi/"+ id)
  }
  const handleSwitchCase = (id) => {
    axiosInstance.put(updateStatusCourse + "?id=" + id).then((response) => {
      if (response && response.data) {
        toast.success("Cập nhật trạng thái thành công")
        setRefresh(true);
      }
    });
  };
  const handleConfirmDelete = () => {
    // Implement delete functionality here
    setOpenDeleteDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
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
              <IconButton
                color="primary"
                onClick={() => console.log("Upload file")}
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
                      <IconButton onClick={handleDownloadClick} color="success">
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
