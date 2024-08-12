// components/StudentTable.js
"use client"
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Snackbar
} from '@mui/material';
import { Visibility, Edit, Delete, Download, Add, Upload } from '@mui/icons-material';

const StudentTable = ({ columns, data, onAddStudent }) => {
  const rowsPerPage = 20;
  const [page, setPage] = useState(1);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({ studentId: '', fullName: '', birthYear: '', school: '', status: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleAddStudent = () => {
    onAddStudent(newStudent);
    setNewStudent({ studentId: '', fullName: '', birthYear: '', school: '', status: '' });
    setOpenAddDialog(false);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ p: 4, width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }} className ="bg-white py-2 px-1 rounded shadow">
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Danh sách sinh viên
        </Typography>
        <Box>
          <Tooltip title="Thêm sinh viên thủ công">
            <IconButton color="primary" onClick={() => setOpenAddDialog(true)}>
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Nhập từ Excel">
            <IconButton color="secondary" onClick={() => setOpenUploadDialog(true)}>
              <Upload />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 'calc(100vh - 160px)', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} align={col.align || 'left'} sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex} sx={{ '&:nth-of-type(odd)': { bgcolor: '#f9f9f9' }, '&:hover': { bgcolor: '#f1f1f1' } }}>
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} align={col.align || 'left'} sx={{ fontSize: '0.875rem' }}>
                      {col.accessor === 'actions' ? (
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="Xem">
                            <IconButton color="primary" size="small">
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Chỉnh sửa">
                            <IconButton color="success" size="small">
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Xóa">
                            <IconButton color="error" size="small">
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Tải xuống">
                            <IconButton color="default" size="small">
                              <Download fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        row[col.accessor]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                  <Typography color="textSecondary">Không có dữ liệu</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      {/* Thêm Sinh Viên Thủ Công */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Thêm Sinh Viên Thủ Công</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Mã sinh viên"
            type="text"
            fullWidth
            variant="outlined"
            value={newStudent.studentId}
            onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Họ và tên"
            type="text"
            fullWidth
            variant="outlined"
            value={newStudent.fullName}
            onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Năm sinh"
            type="number"
            fullWidth
            variant="outlined"
            value={newStudent.birthYear}
            onChange={(e) => setNewStudent({ ...newStudent, birthYear: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Trường học"
            type="text"
            fullWidth
            variant="outlined"
            value={newStudent.school}
            onChange={(e) => setNewStudent({ ...newStudent, school: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Tình trạng"
            type="text"
            fullWidth
            variant="outlined"
            value={newStudent.status}
            onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Hủy</Button>
          <Button onClick={handleAddStudent} variant="contained" color="primary">Thêm</Button>
        </DialogActions>
      </Dialog>

      {/* Nhập từ Excel */}
      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)}>
        <DialogTitle>Nhập Sinh Viên Từ Excel</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Chức năng này sẽ yêu cầu bạn tải lên file Excel.</Typography>
          {/* Thêm mã để xử lý tệp Excel ở đây */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)}>Đóng</Button>
          <Button variant="contained" color="secondary">Tải lên</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo khi thêm sinh viên thành công */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Thêm sinh viên thành công!"
      />
    </Box>
  );
};

export default StudentTable;
