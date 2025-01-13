"use client";
import React from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import StudentCoursesListCurrent from "@/components/course-current";
import StudentCoursesList from "@/components/course-history";

const CourseUserpage = () => {
  const handleDownload = () => {
    // Xử lý tải xuống dữ liệu (giả lập)
    console.log("Tải xuống danh sách môn học");
  };

  return (
    <div className="w-full p-4">
      <StudentCoursesListCurrent />
      <StudentCoursesList />
    </div>
  );
};

export default CourseUserpage;
