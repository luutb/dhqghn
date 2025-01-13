import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

const courses = [
  { idCourse: 'CS101', nameCourse: 'Thể chất cơ bản 1', points: 85, status: 'Chưa qua', semester: 'Học kỳ I', year: '2023' },
  { idCourse: 'CS102', nameCourse: 'Bóng đá 1', points: 78, status: 'Đã qua', semester: 'Học kỳ II', year: '2023' },
  { idCourse: 'CS103', nameCourse: 'Bóng đá 2', points: 92, status: 'Đã qua', semester: 'Học kỳ I', year: '2024' },

];

const StudentCoursesList = () => {
  const handleDownload = () => {
    // Xử lý tải xuống dữ liệu (giả lập)
    console.log('Tải xuống danh sách môn học');
  };

  return (
    <Box className="mt-6 p-4 bg-white shadow-md rounded-lg">
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h5" className="font-semibold text-gray-800">Danh sách các môn học</Typography>
        <IconButton color="primary" onClick={handleDownload}>
          <DownloadIcon />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell className="font-semibold">STT</TableCell>
              <TableCell className="font-semibold">Mã môn học</TableCell>
              <TableCell className="font-semibold">Tên môn học</TableCell>
              <TableCell className="font-semibold">Điểm</TableCell>
              <TableCell className="font-semibold">Tình trạng</TableCell>
              <TableCell className="font-semibold">Học kỳ</TableCell>
              <TableCell className="font-semibold">Năm học</TableCell>
              <TableCell className="font-semibold">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={course.idCourse}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{course.idCourse}</TableCell>
                <TableCell>{course.nameCourse}</TableCell>
                <TableCell>{course.points}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell>{course.semester}</TableCell>
                <TableCell>{course.year}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentCoursesList;
