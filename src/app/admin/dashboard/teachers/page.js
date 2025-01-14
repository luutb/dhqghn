"use client";
import React, { useState } from "react";
import InstructorList from "../../../../components/teacher-table";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddTeacher from "@/components/dialog/add-teacher";
import axios from "axios";
import axiosInstance from "@/axios/api-config";
import { teacher } from "@/axios/endpoints";
import { toast } from "react-toastify";

const App = () => {
  const handleOpenAddDialog = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
  };
  const onSave = (name, department, type, role, code) => {
    var body = {
      fullName: name,
      department: department,
      type: type,
      role: role.name,
      code: code,
    };
    axiosInstance.put(teacher, body).then((response) => {
      if (response) {
        toast.success("Thêm thành công!");
        window.location.reload();
      } else {
        toast.error("Đã có lỗi xảy ra vui lòng thử lại");
      }
    });
  };
  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Danh sách Giảng viên</h1>
        <Tooltip title="Thêm mới">
          <IconButton color="primary" onClick={handleOpenAddDialog}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
      <InstructorList />
      <AddTeacher open={open} onClose={close} onSave={onSave} />
    </div>
  );
};

export default App;
