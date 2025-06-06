"use client";
import { useState, useRef, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  makeStyles,
} from "@mui/material";
import axiosInstance from "@/axios/api-config";
import { useParams, useSearchParams } from "next/navigation";
import { approve, courses, historyDetail } from "@/axios/endpoints";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function HistoryDetail() {
  const [data, setData] = useState(null);
  const [students, setStudents] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const params = useParams();
  const id = decodeURIComponent(params.id.toString());
  useEffect(() => {
    axiosInstance.get(historyDetail + "?id=" + id).then((response) => {
      setData(response.data.data);
      setStudents(response.data.data.students);
      setIsRefresh(false);
    });
  }, []);
  useEffect(() => {
    if (isRefresh) {
      axiosInstance.get(courses + "?id=" + id).then((response) => {
        setData(response.data.data);
        setStudents(response.data.data.students);
        setIsRefresh(false);
      });
    }
  }, [isRefresh]);
  // Tạo các refs để quản lý tiêu điểm

  const textFieldRefs = useRef([]);

  const handleScoreChange = (id, newScore) => {
    const _students = students;
    if (_students) {
      let index = _students.findIndex(
        (m) => m.codeStudent.toString() === id.toString()
      );
      if (newScore > 10) {
        toast.error("Xin lỗi điểm phải nhỏ hơn 10");
        textFieldRefs.current[index].value = students[index].point;
        return;
      }
      if (index > -1) {
        _students[index].point = newScore;
      }
    }
  };

  const fillColor = (point) => {
    if (point < 4) {
      return "text-red-600";
    }
    return "";
  };
  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn chặn hành động mặc định của Enter (thường là submit form)
      const nextIndex = index + 1;
      if (nextIndex < textFieldRefs.current.length) {
        textFieldRefs.current[nextIndex].focus(); // Chuyển tiêu điểm đến ô nhập liệu tiếp theo
      }
    }
  };

  const handleSubmit = async () => {
    axiosInstance.post(approve, { id: id }).then((response) =>{
      if(response.data.data) {
        toast.success("Đã duyệt thành công")
      }
      else{
        toast.error("Đã có lỗi xảy ra")
      }
    })

    // let code = await localStorage.getItem("code");
    // let name = await localStorage.getItem("name");
    // Xử lý logic gửi dữ liệu khi người dùng nhấn "Lưu"
    // await axiosInstance
    //   .put(updatePoint, {
    //     data: {
    //       ...data,
    //       idEdit: code,
    //       nameEdit: name,
    //       students: dataStudents.length > 0 ? dataStudents : students,
    //     },
    //   })
    //   .then((res) => {
    //     if (res && res.data && res.data.error === 200) {
    //       toast.success("Cập nhật điểm thành công!");
    //       setIsRefresh(true);
    //       // window.location.reload()
    //     } else {
    //       toast.error("Vui lòng thử lại sau");
    //     }
    //   });
  };

  return (
    <div className="my-1 w-full px-4">
      <div className="bg-white p-4 rounded">
        <Typography variant="h4" component="h1" gutterBottom>
          Lịch sử chỉnh sửa
        </Typography>
        <div className="flex flex-row justify-between">
          <Typography variant="h6" component="h2">
            Mã môn: {data?.codeCourse}
          </Typography>
          <Typography variant="h6" component="h2">
            Tên môn: {data?.nameCourse}
          </Typography>
          <Typography variant="h6" component="h2">
            Tên trường: {data?.date}
          </Typography>
          <Typography variant="h6" component="h2">
            Thời gian thi: {data?.date}
          </Typography>
        </div>
      </div>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-lg text-center">
                Số thứ tự
              </TableCell>
              <TableCell className="font-bold text-lg text-center">
                Mã sinh viên
              </TableCell>
              <TableCell className="font-bold text-lg text-center">
                Họ và tên
              </TableCell>
              <TableCell className="font-bold text-lg text-center">
                Năm sinh
              </TableCell>
              <TableCell className="font-bold text-lg text-center">
                Điểm cuối kỳ
              </TableCell>
              <TableCell className="font-bold text-lg text-center">
                Ghi chú
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length > 0
              ? students?.map((row, index) => (
                  <TableRow key={row.codeStudent}>
                    <TableCell
                      className={`font-thin text-center ${fillColor(
                        row.point
                      )}`}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      className={`font-thin text-center ${fillColor(
                        row.point
                      )}`}
                    >
                      {row.codeStudent}
                    </TableCell>
                    <TableCell
                      className={`font-thin text-center ${fillColor(
                        row.point
                      )}`}
                    >
                      {row.fullName}
                    </TableCell>
                    <TableCell
                      className={`font-thin text-center ${fillColor(
                        row.point
                      )}`}
                    >
                      {row.date}
                    </TableCell>
                    <TableCell
                      className={`font-thin text-center ${fillColor(
                        row.point
                      )}`}
                    >
                      <TextField
                        disabled={true}
                        size="small"
                        type="number"
                        inputProps={{ step: "0.1" }}
                        defaultValue={row.point}
                        onChange={(e) =>
                          handleScoreChange(row.codeStudent, e.target.value)
                        }
                        onKeyDown={(e) => {}}
                        inputRef={(el) =>{}} // Lưu ref vào mảng
                      />
                    </TableCell>
                    <TableCell>{row.notes}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        className="mt-4"
        onClick={handleSubmit}
      >
        Phê duyệt
      </Button>
    </div>
  );
}
