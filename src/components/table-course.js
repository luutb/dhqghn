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
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  GetApp as GetAppIcon,
  Add as AddIcon,
  Upload as UploadIcon,
 
} from "@mui/icons-material";
import HistoryIcon from '@mui/icons-material/History';
import axiosInstance from "@/axios/api-config";
import {
  courses,
  downloadCourse,
  subjects,
  universitys,
  updatePoints,
  updateStatusCourse,
  uploadCourse,
} from "@/axios/endpoints";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
const cohorts = ["23", "22", "21", "20", "19", "18"];
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
  const [subjectsState, setSubjects] = useState([]);
  const [ids, setIds] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);
  const [schools, setSchools] = useState([]);
  const [isStatus, setIsStatus] = useState(false);

  const [isCheckbox, setIsCheckbox] = useState([]);
  const handleFileChange = (e) => {
    uploadFile(e.target.files[0]);
  };
  const [selectedSchool, setSelectedSchool] = useState(null);
  const router = useRouter();
  const handleDeleteClick = (exam) => {
    setSelectedExam(exam);
    setOpenDeleteDialog(true);
  };
  useEffect(() => {
    axiosInstance.get(universitys).then((response) => {
      if (response && response.data && response.data.data) {
        setSchools([...response.data.data]);
      }
    });
  }, []);
  useEffect(() => {
    axiosInstance.get(subjects).then((response) => {
      if (response && response.data && response.data.data) {
        setSubjects([...response.data.data]);
      }
    });
  }, []);
  useEffect(() => {
    if (refresh) {
      axiosInstance
        .get(courses)
        .then((response) => {
          if (response && response.data && response.data.data) {
            setCourses([...response.data.data]);
            setIsCheckbox(response.data.data.map((m) => false));
          }
        })
        .finally(() => {
          setRefresh(false);
        });
    }
  }, [refresh]);
  const handleFind = () => {
    axiosInstance
      .get(
        `${courses}?nameCourse=${searchTerm}&univercity=${selectedSchool.name}&codeCourse=${selectedCohort}`
      )
      .then((response) => {
        if (response && response.data && response.data.data) {
          setCourses([...response.data.data]);
        }
      })
      .finally(() => {
        setRefresh(false);
      });
  };
  const handleDownloadClick = (id) => {
    // const ws = XLSX.utils.json_to_sheet(exams);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Exams');
    // const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    // saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'exams.xlsx');
    axiosInstance.get(downloadCourse + "?id=" + id).then((response) => {
      if (response && response.data) {
        window.open("http://116.118.48.169:3200/export.xlsx");
      }
    });
  };
  const navigationCourse = (id) => {
    router.push("/quan-ly-thi/" + id);
  };
  const navigationHistory = (id) =>{
    router.push("/lich-su-sua/" + id);
  }
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
    deleteCourse(selectedExam.id);
    setOpenDeleteDialog(false);
  };

  const deleteCourse = (id) => {
    axiosInstance.delete(`/api/v1/courses?id=${id}`).then((res) => {
      if (res.data && res.data.error == 200) {
        toast.success("Xoá thành công thành công");
        setRefresh(true);
      } else {
        toast.success("Đã có sự cố! Vui lòng thử lại");
      }
    });
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const [selectedCohort, setSelectedCohort] = useState(null);
  const handleCohortChange = (event) => {
    setSelectedCohort(event.target.value);
  };
  const uploadFile = async (_file) => {
    if (!_file) {
      return;
    }
    const formData = new FormData();
    formData.append("course", _file);
    try {
      axiosInstance
        .post(uploadCourse, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response && response.data) {
            toast.success("Cập nhật trạng thái thành công");
            setRefresh(true);
          }
        });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSchoolChange = (event) => {
    console.log("event.target.value", event.target.value);
    if (event.target.value) {
      setSelectedSchool(event.target.value ?? "");
    } else {
      setSelectedSchool("");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const onChange = (event) => {
    setIsChecked(event.target.checked);
    setIsCheckbox(isCheckbox.map((m) => event.target.checked));
    let idState = [];
    if (event.target.checked) {
      coursesState.map((m) => {
        idState.push(m.id);
      });
      setIds(idState);
    } else {
      setIds([]);
    }
  };
  const handleSwitchCaseAll = (event) => {
    console.log("event", event);

    let body = {
      ids: ids,
      status: event.target.checked,
    };

    axiosInstance.put(updatePoints, body).then((res) => {
      if (res.data.data) {
        toast.success("Xoá thành công thành công");
        setRefresh(true);
      } else {
      }
    });
  };
  const onChangeItem = (event, id, index) => {
    let idState = [];
    isCheckbox[index] = event.target.checked;
    setIsCheckbox(isCheckbox);
    console.log("ids", id);
    if (event.target.checked) {
      idState.push(id);
      setIds(idState);
    } else {
      const index = ids.findIndex((m) => m === id);
      console.log("ids", index);
      if (index >= 0) {
        ids.splice(index, 1);
      }
      setIds([...ids]);
    }
  };

  return (
    <div className="w-full">
      <Box>
        <Paper elevation={4} className="flex flex-col bg-white ">
          <Toolbar className="flex flex-row justify-center items-center w-full">
            <Typography variant="h4" sx={{ flexGrow: 1, color: "#1976d2" }}>
              Quản lý phòng thi
            </Typography>
            <div className=" flex w-[70%] flex-wrap gap-4 bg-white ">
              <TextField
                label="Tìm kiếm tên môn thi"
                variant="outlined"
                defaultValue={searchTerm}
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
                <InputLabel>Môn học</InputLabel>
                <Select
                  value={selectedCohort}
                  onChange={handleCohortChange}
                  label="Khóa"
                >
                  <MenuItem value="">
                    <em>Tất cả</em>
                  </MenuItem>
                  {subjectsState.map((subject) => (
                    <MenuItem key={subject.id} value={subject.code}>
                      {subject.nameSubject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button
                className="bg-blue-500 text-white rounded text-base font-bold p-1"
                onClick={() => {
                  handleFind();
                }}
              >
                <div className="w-[100px]  rounded">Tìm kiếm</div>
              </button>
            </div>
            <Box>
              <Tooltip title="Đóng/Mở môn thi" arrow>
                <Switch
                  defaultChecked={false}
                  color="secondary"
                  onChange={(event) => {
                    handleSwitchCaseAll(event);
                  }}
                />
              </Tooltip>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }} // Ẩn input file
                onChange={handleFileChange}
              />
              <Tooltip title="Thêm mới Excel" arrow>
                <IconButton
                  color="primary"
                  onClick={() => fileInputRef.current.click()}
                  sx={{ mr: 1 }}
                >
                  <UploadIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox defaultChecked={false} onChange={onChange} />
                  </TableCell>
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
                    <TableCell>
                      <Checkbox
                        defaultChecked={false}
                        checked={isCheckbox[index]}
                        onChange={(event) =>
                          onChangeItem(event, exam.id, index)
                        }
                      />
                    </TableCell>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{exam.nameRoom}</TableCell>
                    <TableCell>{exam.codeCourse}</TableCell>
                    <TableCell>{exam.nameCourse}</TableCell>
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
                      <Tooltip title="Xem chi tiết" arrow>
                        <IconButton
                          onClick={() => navigationCourse(exam.id)}
                          color="info"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa môn thi" arrow>
                        <IconButton
                          onClick={() => handleDeleteClick(exam)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Tải xuống chi tiết" arrow>
                      <IconButton
                        onClick={() => {
                          handleDownloadClick(exam.id);
                        }}
                        color="success"
                      >
                        <GetAppIcon />
                      </IconButton>
                      </Tooltip>
                      <Tooltip title="Lịch sử sửa điểm" arrow>
                        <IconButton
                          onClick={() => navigationHistory(exam.id)}
                          color="error"
                        >
                          <HistoryIcon />
                        </IconButton>
                      </Tooltip>
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
