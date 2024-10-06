import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Tooltip,
  Avatar,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DialogAddPermission from "./dialog/new-permision";
import DialogEditPermission from "./dialog/edit-permission";

const initialPermissions = [
  {
    id: 1,
    name: "Admin",
    members: ["A", "B", "C"],
    rights: [
      "Chỉnh sửa thông tin giảng viên",
      "Chỉnh sửa điểm thi",
      "Sắp xếp lịch làm việc",
    ],
  },
  {
    id: 2,
    name: "Editor",
    members: ["D", "E"],
    rights: ["Chỉnh sửa điểm thi", "Sắp xếp lịch làm việc"],
  },
  {
    id: 3,
    name: "Viewer",
    members: ["F"],
    rights: ["Xem thông tin giảng viên"],
  },
];

const PermissionTable = () => {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [newPermission, setNewPermission] = useState({
    name: "",
    members: [],
    rights: [],
  });
  const [editPermission, setEditPermission] = useState({
    name: "",
    members: [],
    rights: [],
  });

  const handleOpenEditDialog = (permission) => {
    setSelectedPermission(permission);
    setEditPermission({ ...permission });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedPermission(null);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewPermission({ name: "", members: [], rights: [] });
  };

  const handleAddNew = () => {
    setPermissions([
      ...permissions,
      { id: permissions.length + 1, ...newPermission },
    ]);
    handleCloseAddDialog();
  };



  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h4" className="font-bold">
          Thiết lập phân quyền
        </Typography>
        <Tooltip title="Thêm mới">
          <IconButton color="primary" onClick={handleOpenAddDialog}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>

      <TableContainer component={Paper} className="shadow-md rounded-lg">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="bg-gray-200 font-bold">
                Tên nhóm quyền
              </TableCell>
              <TableCell className="bg-gray-200 font-bold">
                Thành viên
              </TableCell>
              <TableCell className="bg-gray-200 font-bold">Quyền</TableCell>
              <TableCell className="bg-gray-200 font-bold">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow
                key={permission.id}
                className="hover:bg-gray-100 transition-colors"
              >
                <TableCell>{permission.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {permission.members.map((member, index) => (
                      <Avatar
                        key={index}
                        className="mr-2"
                        alt={member}
                        src={`https://i.pravatar.cc/150?img=${index + 1}`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <ul className="list-disc ml-4">
                    {permission.rights.map((right, index) => (
                      <li key={index}>{right}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditDialog(permission)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" className="ml-2">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Dialog chỉnh sửa quyền */}
        <DialogEditPermission
          openEditDialog={openEditDialog}
          handleCloseEditDialog={handleCloseEditDialog}
          editPermission={editPermission}
          setEditPermission={setEditPermission}
        />

        {/* Dialog thêm quyền mới */}
        <DialogAddPermission
          openAddDialog={openAddDialog}  
          handleCloseAddDialog={handleCloseAddDialog}
          handleAddNew={handleAddNew}
        />
      </TableContainer>
    </div>
  );
};

export default PermissionTable;
