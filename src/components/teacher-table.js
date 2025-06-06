import React, { useEffect, useState } from "react";
// import Avatar from 'react-avatar';
import { IconButton, Tooltip } from "@mui/material";
import { Edit, Delete, Lock } from "@mui/icons-material";
import EditInstructorDialog from "./dialog/edit-teacher";
import DeleteInstructorDialog from "./dialog/delete-teacher";
import ChangePasswordDialog from "./dialog/changepassword-teacher";
import axiosInstance from "@/axios/api-config";
import { createAcc, teacher, teachers } from "@/axios/endpoints";
import { toast } from "react-toastify";

const initialInstructors = [
  {
    id: "GV001",
    name: "Nguyễn Văn A",
    department: "Khoa CNTT",
    type: 1,
    avatar: null,
  },
  {
    id: "GV002",
    name: "Trần Thị B",
    department: "Khoa Toán",
    type: 2,
    avatar: null,
  },
  // Add more instructors here
];

const InstructorList = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [dialogType, setDialogType] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);
  const [info, setInfo] = useState({});
  const [instructors, setInstructors] = useState(null);
  useEffect(() => {
    axiosInstance.get(teachers).then((response) => {
      if (response && response.data && response.data.error === 200) {
        setInstructors(response.data.data);
      } else {
      }
    });
  }, []);

  const handleEdit = (instructor) => {
    setSelectedInstructor(instructor);
    setDialogType("edit");
    setEditDialogOpen(true);
  };

  const handleDelete = (instructor) => {
    setSelectedInstructor(instructor);
    setDialogType("delete");
    setDeleteDialogOpen(true);
  };

  const handleChangePassword = (instructor) => {
    console.log("instructor", instructor);
    setSelectedInstructor(instructor);
    setDialogType("changePassword");

    setChangePasswordDialogOpen(true);
  };

  const handleSave = (updatedInstructor) => {
    setInstructors(
      instructors.map((instructor) =>
        instructor._id === updatedInstructor._id ? updatedInstructor : instructor
      )
    );
    setEditDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    axiosInstance.delete(`${teacher}?id=${selectedInstructor._id}`).then((response) =>{
      if(response){
        toast.success("Đã xóa thành công giảng viên")
        setInstructors(
          instructors.filter(
            (instructor) => instructor._id !== selectedInstructor._id
          )
        );
        
        setDeleteDialogOpen(false);
      }
      else{
        toast.error("Đã có lỗi xảy ra")
        setDeleteDialogOpen(false);
      }
    })
   
  };

  const handleChangePasswordConfirm = (newPassword) => {
    let body = {
      code: selectedInstructor.id,
      fullName: selectedInstructor.fullname,
      dob: "",
      password: newPassword,
    };
    axiosInstance.post(createAcc,body).then((response) => {
      if(response){
        toast.success("Đã thay đổi thông tin thành công")
      }
    });
    setChangePasswordDialogOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="px-6 py-3 border-b text-left">Mã giảng viên</th>
            <th className="px-6 py-3 border-b text-left">Tên giảng viên</th>
            <th className="px-6 py-3 border-b text-left">Ảnh</th>
            <th className="px-6 py-3 border-b text-left">Phòng ban</th>
            <th className="px-6 py-3 border-b text-left">Loại giảng viên</th>
            <th className="px-6 py-3 border-b text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {instructors && instructors.length > 0
            ? instructors.map((instructor) => (
                <tr key={instructor._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b text-left">
                    {instructor._id}
                  </td>
                  <td className="px-6 py-4 border-b text-left">
                    {instructor.fullname}
                  </td>
                  <td className="px-6 py-4 border-b text-left">
                    {/* <Avatar src={instructor.avatar} name={instructor.name} size="40" round={true} /> */}
                  </td>
                  <td className="px-6 py-4 border-b text-left">
                    {instructor.department}
                  </td>
                  <td className="px-6 py-4 border-b text-left">
                    {instructor.type === 1
                      ? "Giảng viên Cơ hữu"
                      : "Giảng viên Thỉnh giảng"}
                  </td>
                  <td className="px-6 py-4 border-b text-left">
                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(instructor)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(instructor)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Thay đổi mật khẩu">
                      <IconButton
                        color="info"
                        onClick={() => handleChangePassword(instructor)}
                      >
                        <Lock />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>

      {editDialogOpen && (
        <EditInstructorDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          instructor={selectedInstructor}
          onSave={handleSave}
        />
      )}

      {deleteDialogOpen && (
        <DeleteInstructorDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      )}

      {changePasswordDialogOpen && (
        <ChangePasswordDialog
          open={changePasswordDialogOpen}
          onClose={() => setChangePasswordDialogOpen(false)}
          onChangePassword={handleChangePasswordConfirm}
        />
      )}
    </div>
  );
};

export default InstructorList;
