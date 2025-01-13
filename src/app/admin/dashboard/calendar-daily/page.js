"use client";
import React, { useState } from "react";
import Calendar from "../../../../components/calender-daily";
import { Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import WorkScheduleDialog from "@/components/dialog/dialog-add-work-schedule";

const HomePage = () => {
  const [openDialog,setOpenDialog] = useState(false);
  return (
    <div className="w-full">
      <Toolbar className="bg-white">
        <Typography
          variant="h4"
          component="h1"
          sx={{ flexGrow: 1, color: "#1976d2" }}
        >
          Quản lý lịch làm việc
        </Typography>
        <Box>
          <IconButton
            color="primary"
            onClick={() => setOpenDialog(true)}
            sx={{ mr: 1 }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Calendar />
      <WorkScheduleDialog open={openDialog} onClose={() =>{setOpenDialog(false)}} />
    </div>
  );
};

export default HomePage;
