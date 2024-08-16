
"use client"
import React, { useState } from 'react';
import { IconButton, Tooltip, CircularProgress } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import EditPermissionDialog from '../../../../components/dialog/dialog-role';
import DeletePermissionDialog from '../../../../components/dialog/delete-role';
import LoadingSpinner from '../../../../components/loading';
const allInstructors = [
  { id: 'GV001', name: 'Nguyễn Văn A' },
  { id: 'GV002', name: 'Trần Thị B' },
  { id: 'GV003', name: 'Lê Văn C' },
  { id: 'GV004', name: 'Nguyễn Thị D' }
];

const initialPermissions = [
  { id: 'PQ001', name: 'Quản trị viên', role: 'Chỉnh sửa thông tin sinh viên', members: ['GV001', 'GV002'] },
  { id: 'PQ002', name: 'Giảng viên', role: 'Nhập điểm', members: ['GV003', 'GV004'] },
];

const GroupPermissionsList = () => {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEdit = (permission) => {
    setSelectedPermission(permission);
    setEditDialogOpen(true);
  };

  const handleDelete = (permission) => {
    setSelectedPermission(permission);
    setDeleteDialogOpen(true);
  };

  const handleSave = (updatedPermission) => {
    setLoading(true);
    setTimeout(() => {
      setPermissions(permissions.map(permission =>
        permission.id === updatedPermission.id ? updatedPermission : permission
      ));
      setLoading(false);
      setEditDialogOpen(false);
    }, 1000);
  };

  const handleDeleteConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setPermissions(permissions.filter(permission => permission.id !== selectedPermission.id));
      setLoading(false);
      setDeleteDialogOpen(false);
    }, 1000);
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="px-6 py-3 border-b text-left">Mã quyền</th>
            <th className="px-6 py-3 border-b text-left">Tên quyền</th>
            <th className="px-6 py-3 border-b text-left">Quyền</th>
            <th className="px-6 py-3 border-b text-left">Thành viên</th>
            <th className="px-6 py-3 border-b text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 border-b text-left">{permission.id}</td>
              <td className="px-6 py-4 border-b text-left">{permission.name}</td>
              <td className="px-6 py-4 border-b text-left">{permission.role}</td>
              <td className="px-6 py-4 border-b text-left">
                {permission.members.map(memberId => {
                  const member = allInstructors.find(instructor => instructor.id === memberId);
                  return member ? member.name : '';
                }).join(', ')}
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

export default GroupPermissionsList;
