"use client";
import React, { useEffect, useState } from "react";
import {
  IconButton,
  Tooltip,
  CircularProgress,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Edit, Delete, AccessAlarm } from "@mui/icons-material";
import EditPermissionDialog from "../../../../components/dialog/dialog-role";
import DeletePermissionDialog from "../../../../components/dialog/delete-role";
import LoadingSpinner from "../../../../components/loading";
import axiosInstance from "@/axios/api-config";
import { teachers } from "@/axios/endpoints";
import { useRouter } from "next/navigation";
const allInstructors = [
  { id: "GV001", name: "Nguyễn Văn A" },
  { id: "GV002", name: "Trần Thị B" },
  { id: "GV003", name: "Lê Văn C" },
  { id: "GV004", name: "Nguyễn Thị D" },
];

const initialPermissions = [
  {
    id: "PQ001",
    name: "Quản trị viên",
    role: "Chỉnh sửa thông tin sinh viên",
    members: ["GV001", "GV002"],
  },
  {
    id: "PQ002",
    name: "Giảng viên",
    role: "Nhập điểm",
    members: ["GV003", "GV004"],
  },
];
const programs = [
  {
    name: "Phân quyền",
    discription: "Phân quyền người dùng và chức năng",
    link:"/cai-dat-quyen"
  },
  {
    name: "Khóa học",
    discription: "Thêm, sửa, xóa khóa học",
    link:"/cai-dat-quyen"
  },
  {
    name: "Tài khoản người dùng",
    discription: "Thêm, sửa, xóa người dùng",
    link:"/cai-dat-quyen"
  },
  {
    name: "Quản lý tài liệu",
    discription: "Thêm, sửa, xóa tài liệu tải lên",
    link:"/cai-dat-quyen"
  },
];

const GroupPermissionsList = () => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {programs.map((m) => (
        <CardComponent name={m.name} discription={m.discription} link={m.link}/>
      ))}
    </div>
  );
};
const CardComponent = (props) => {
  const route = useRouter()
  const { name, discription ,link} = props;
  return (
    <Card className="w-full shadow-lg" onClick={()=>route.push(link)}>
      <CardContent className="flex flex-col items-center">
        <AccessAlarm className="text-blue-500" style={{ fontSize: 50 }} />
        <Typography variant="h5" component="div" className="mt-4">
          {name}
        </Typography>
        <Typography variant="body2" className="text-center">
          {discription}
        </Typography>
      </CardContent>
    </Card>
  );
};


export default GroupPermissionsList;
