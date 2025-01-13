"use client";
import { useState, useEffect } from "react";
import {
  IconButton,
  Tooltip,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Box,
  Toolbar,
} from "@mui/material";
import { Edit, Delete, AccessAlarm } from "@mui/icons-material";
import EditPermissionDialog from "../../../../components/dialog/dialog-role";
import DeletePermissionDialog from "../../../../components/dialog/delete-role";
import LoadingSpinner from "../../../../components/loading";
import axiosInstance from "@/axios/api-config";
import { role, roles, teachers } from "@/axios/endpoints";
import {
    Visibility as VisibilityIcon,
    Delete as DeleteIcon,
    GetApp as GetAppIcon,
    Add as AddIcon,
    Upload as UploadIcon,
  } from "@mui/icons-material";
const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rolesData, setRoles] = useState([]);
  const [instructors, setInstructors] = useState(null);
  useEffect(() => {
    axiosInstance.get(teachers).then((response) => {
      if (response && response.data && response.data.error === 200) {
        setInstructors(response.data.data);
      } else {
      }
    });
  }, []);
  useEffect(() => {
    axiosInstance.get(roles).then((res) => {
      if (res && res.data && res.data.error === 200) {
        setRoles(res.data.data);
      } else {
        setRoles(rolesData);
      }
    });
  }, []);

  const handleEdit = (permission) => {
    setSelectedPermission(permission);
    setEditDialogOpen(true);
  };

  const handleDelete = (permission) => {
    setSelectedPermission(permission);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = () => {
    setLoading(true);

    axiosInstance.delete(role + "?id=" + selectedPermission.id).then((res) => {
      if (res && res.data && res.data.data) {
        setLoading(false);
        window.location.reload();
      }
    });
  };

  const handleSave = (updatedPermission) => {
    setLoading(true);
    setTimeout(() => {
      setPermissions(
        permissions.map((permission) =>
          permission.id === updatedPermission.id
            ? updatedPermission
            : permission
        )
      );
      setLoading(false);
      setEditDialogOpen(false);
    }, 1000);
  };
  return (
    <div className="overflow-x-auto p-4 w-full">
      <Toolbar>
            <Typography
              variant="h4"
              component="h1"
              sx={{ flexGrow: 1, color: "#1976d2" }}
            >
              Quản lý phân quyền
            </Typography>
            <Box>
              <IconButton
                color="primary"
                onClick={() => {
                    setSelectedPermission(null);
                    setEditDialogOpen(true)
                }}
                sx={{ mr: 1 }}
              >
                <AddIcon />
              </IconButton>
             
            
            </Box>
          </Toolbar>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="px-6 py-3 border-b text-left">Mã quyền</th>
            <th className="px-6 py-3 border-b text-left">Tên quyền</th>
            {/* <th className="px-6 py-3 border-b text-left">Quyền</th> */}
            <th className="px-6 py-3 border-b text-left">Thành viên</th>
            <th className="px-6 py-3 border-b text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {rolesData.map((permission) => (
            <tr key={permission.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 border-b text-left">
                {permission.code}
              </td>
              <td className="px-6 py-4 border-b text-left">
                {permission.nameRole}
              </td>

              <td className="px-6 py-4 border-b text-left">
                {permission.members
                  .map((member) => {
                    //   const member = instructors.find(
                    //     (instructor) => instructor._id === memberId.id
                    //   );
                    return member.fullname;
                  })
                  .join(", ")}
              </td>
              <td className="px-6 py-4 border-b text-left">
                <Tooltip title="Chỉnh sửa">
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(permission)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(permission)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editDialogOpen && (
        <EditPermissionDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          permission={selectedPermission}
          onSave={handleSave}
        />
      )}

      {deleteDialogOpen && (
        <DeletePermissionDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onDelete={handleDeleteConfirm}
        />
      )}

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default Permissions;
