
"use client"
import { useState, useRef } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const initialData = [
  { id: 'SV001', fullname: 'Nguyễn Văn A', dob: '2000-01-15', finalScore: 8.5, notes: '' },
  { id: 'SV002', fullname: 'Trần Thị B', dob: '1999-05-22', finalScore: 7.0, notes: '' },
  { id: 'SV003', fullname: 'Lê Văn C', dob: '2001-09-30', finalScore: 9.0, notes: '' },
  { id: 'SV004', fullname: 'Phạm Thị D', dob: '2000-12-01', finalScore: 6.5, notes: '' },
  { id: 'SV005', fullname: 'Bùi Văn E', dob: '1998-07-10', finalScore: 8.0, notes: '' },
];

export default function Home() {
  const [data, setData] = useState(initialData);

  // Tạo các refs để quản lý tiêu điểm
  const textFieldRefs = useRef([]);

  const handleScoreChange = (id, newScore) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, finalScore: parseFloat(newScore) } : row
      )
    );
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Ngăn chặn hành động mặc định của Enter (thường là submit form)
      const nextIndex = index + 1;
      if (nextIndex < textFieldRefs.current.length) {
        textFieldRefs.current[nextIndex].focus(); // Chuyển tiêu điểm đến ô nhập liệu tiếp theo
      }
    }
  };

  const handleSubmit = () => {
    // Xử lý logic gửi dữ liệu khi người dùng nhấn "Lưu"
    console.log("Dữ liệu đã được cập nhật:", data);
  };

  return (
    <Container maxWidth="lg" className="my-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Danh sách thi
      </Typography>
      <Typography variant="h6" component="h2">
        Mã môn: [Nhập mã môn]
      </Typography>
      <Typography variant="h6" component="h2">
        Tên môn: [Nhập tên môn]
      </Typography>
      <Typography variant="h6" component="h2">
        Tên trường: [Nhập tên trường]
      </Typography>
      <Typography variant="h6" component="h2">
        Thời gian thi: [Nhập thời gian thi]
      </Typography>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã sinh viên (id)</TableCell>
              <TableCell>Họ và tên (fullname)</TableCell>
              <TableCell>Năm sinh (dob)</TableCell>
              <TableCell>Điểm cuối kỳ</TableCell>
              <TableCell>Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.fullname}</TableCell>
                <TableCell>{row.dob}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    inputProps={{ step: "0.1" }}
                    value={row.finalScore}
                    onChange={(e) => handleScoreChange(row.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputRef={el => textFieldRefs.current[index] = el} // Lưu ref vào mảng
                  />
                </TableCell>
                <TableCell>{row.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button 
        variant="contained" 
        color="primary" 
        className="mt-4"
        onClick={handleSubmit}
      >
        Lưu
      </Button>
    </Container>
  );
}
