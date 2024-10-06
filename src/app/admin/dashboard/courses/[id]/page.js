
"use client"
import { useState, useRef, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import axiosInstance from '@/axios/api-config';
import { useParams, useSearchParams } from 'next/navigation';
import { courses } from '@/axios/endpoints';
import { useRouter } from 'next/navigation';
const initialData = [
  { id: 'SV001', fullname: 'Nguyễn Văn A', dob: '2000-01-15', point: 8.5, notes: '' },
  { id: 'SV002', fullname: 'Trần Thị B', dob: '1999-05-22', point: 7.0, notes: '' },
  { id: 'SV003', fullname: 'Lê Văn C', dob: '2001-09-30', point: 9.0, notes: '' },
  { id: 'SV004', fullname: 'Phạm Thị D', dob: '2000-12-01', point: 6.5, notes: '' },
  { id: 'SV005', fullname: 'Bùi Văn E', dob: '1998-07-10', point: 8.0, notes: '' },
];

export default function Home() {
  const [data, setData] = useState(null);
  const params = useParams();
  const id = decodeURIComponent(params.id.toString())

  useEffect(()=>{
    axiosInstance.get(courses +"?id=" + id).then((response) =>{
      setData(response.data.data)
    })
  },[])
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
    <div  className="my-1 w-full px-4">
      <div className='bg-white p-4 rounded'>
      <Typography variant="h4" component="h1" gutterBottom>
        Danh sách thi
      </Typography>
      <div className='flex flex-row justify-between'>
      <Typography variant="h6" component="h2">
        Mã môn: {data?.codeCourse}
      </Typography>
      <Typography variant="h6" component="h2">
        Tên môn:  {data?.nameCourse}
      </Typography>
      <Typography variant="h6" component="h2">
        Tên trường:  {data?.date}
      </Typography>
      <Typography variant="h6" component="h2">
        Thời gian thi:  {data?.date}
      </Typography>
      </div>
      </div>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã sinh viên</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Năm sinh</TableCell>
              <TableCell>Điểm cuối kỳ</TableCell>
              <TableCell>Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.students.map((row, index) => (
              <TableRow key={row.codeStudent}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.codeStudent}</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    inputProps={{ step: "0.1" }}
                    value={row.point}
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
    </div>
  );
}
