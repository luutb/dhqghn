// StudentList.js
"use client";
import React, { useEffect, useState } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import axiosInstance from "@/axios/api-config";
import { findStudent, liststudent, universitys } from "@/axios/endpoints";
import { useLoading } from "@/context/loading-context";

const initialStudents = [
  {
    id: "S001",
    fullName: "Nguyen Van A",
    gender: "Nam",
    address: "123 Đường ABC",
    className: "10A1",
    courseName: "Toán",
    specialized: "KHTN",
    school: "Trường A",
    cohort: "20",
  },
  {
    id: "S002",
    fullName: "Tran Thi B",
    gender: "Nữ",
    address: "456 Đường DEF",
    className: "10A2",
    courseName: "Lý",
    specialized: "XH",
    school: "Trường B",
    cohort: "19",
  },
  // Thêm dữ liệu sinh viên khác ở đây
];

// const schools = ['Trường A', 'Trường B', 'Trường C'];
const cohorts = ["20", "19", "18"];

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const {showLoading,hideLoading} = useLoading() 
  useEffect(() => {
    showLoading()
    axiosInstance.get(liststudent).then((response) => {
      if (response && response.data && response.data.data) {
        setStudents(response.data.data);
      }
    }).finally(()=>{
      hideLoading();
    });
  }, []);
  useEffect(() => {
    axiosInstance.get(universitys).then((response) => {
      if (response && response.data && response.data.data) {
        setSchools([...response.data.data]);
      }
    });
  }, []);
  const handleFind = () =>{
    let body = {
      nameStudent: searchTerm,
      university: selectedSchool.name ??""
    }
    axiosInstance.post(findStudent,body).then((response) =>{
      if (response && response.data && response.data.data) {
        setStudents([...response.data.data]);
      }
    })
  }
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSchoolChange = (event) => {
    console.log("event.target.value",event.target.value)
    if(event.target.value){
      setSelectedSchool(event.target.value ?? "");
    }
  else{
    setSelectedSchool("")
  }
  };

  const handleCohortChange = (event) => {
    setSelectedCohort(event.target.value);
  };

  // const filteredStudents = students.filter(
  //   (student) =>
  //     (student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       student.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //     (selectedSchool ? student.school === selectedSchool : true) &&
  //     (selectedCohort ? student.cohort === selectedCohort : true)
  // );

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Danh sách sinh viên
      </h1>

      <div className="mb-6 flex w-[70%] flex-wrap gap-4 bg-white">
        <TextField
          label="Tìm kiếm tên hoặc mã sinh viên"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 min-w-[200px]"
          size="small"
        />
        <FormControl
          variant="outlined"
          className="flex-1 min-w-[200px]"
          size="small"
        >
          <InputLabel>Trường</InputLabel>
          <Select
            value={selectedSchool}
            onChange={handleSchoolChange}
            label="Trường"
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            {schools.map((school) => (
              <MenuItem key={school} value={school}>
                {school.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          className="flex-1 min-w-[200px]"
          size="small"
        >
          <InputLabel>Khóa</InputLabel>
          <Select
            value={selectedCohort}
            onChange={handleCohortChange}
            label="Khóa"
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            {cohorts.map((cohort) => (
              <MenuItem key={cohort} value={cohort}>
                {cohort}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button onClick={() =>{handleFind()}}>
          <div className="w-[100px] bg-black rounded">Tìm kiếm</div>
        </button>
      </div>

      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell className="font-semibold">Mã sinh viên</TableCell>
              <TableCell className="font-semibold">Tên sinh viên</TableCell>
              <TableCell className="font-semibold">Giới tính</TableCell>
              <TableCell className="font-semibold">Địa chỉ</TableCell>
              <TableCell className="font-semibold">Ngành học</TableCell>
              <TableCell className="font-semibold">Lớp học</TableCell>
              <TableCell className="font-semibold">Trường</TableCell>
              <TableCell className="font-semibold">Khóa</TableCell>
              <TableCell className="font-semibold">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="hover:bg-gray-100 h-[30px]">
                <TableCell className="py-0">{student._id}</TableCell>
                <TableCell className="py-0">{student.fullName}</TableCell>
                <TableCell className="py-0">{student.gender}</TableCell>
                <TableCell className="py-0">{student.address}</TableCell>
                <TableCell className="py-0">{student.courseName}</TableCell>
                <TableCell className="py-0">{student.className}</TableCell>
                <TableCell className="py-0">{student.specialized}</TableCell>
                <TableCell className="py-0">{student.cohort}</TableCell>
                <TableCell className="py-0">
                  <div className="flex space-x-2 justify-center">
                    <IconButton color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="secondary">
                      <DownloadIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentList;
