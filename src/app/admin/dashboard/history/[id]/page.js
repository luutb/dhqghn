"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Paper,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  GetApp as GetAppIcon,
  Add as AddIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import axiosInstance from "@/axios/api-config";
import {
  downloadCourse,
  historyEdit,
  subjects,
  universitys,
  updatePoints,
  updateStatusCourse,
  uploadCourse,
} from "@/axios/endpoints";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
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

function TableHistoryCourse() {
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
  const params = useParams();
  const id = decodeURIComponent(params.id.toString());

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
        .get(`${historyEdit}?id=` + id)
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
      .get(historyEdit)
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
    router.push("/chi-tiet/" + id);
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
    console.log("_file", _file);
    if (!_file) {
      console.log("_file");
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
                  <TableCell>Người sửa điểm</TableCell>

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
                      <TableCell>{exam.nameEdit}</TableCell>
                    </TableCell>

                    <TableCell>
                      <Tooltip title="Xem chi tiết" arrow>
                        <IconButton
                          onClick={() => navigationCourse(exam.id)}
                          color="info"
                        >
                          <VisibilityIcon />
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

export default TableHistoryCourse;
