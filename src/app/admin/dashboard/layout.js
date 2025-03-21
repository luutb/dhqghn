"use client";

import * as React from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
// @ts-ignore
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
// @ts-ignore
import Typography from "@mui/material/Typography";
// @ts-ignore
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/navigation";
import CoursePage from "./courses/page";

const drawerWidth = 240;
const menus = [
  {
    id: 1,
    name: "Bảng điều khiển",
    url: "/bang-dieu-khien",
    isShow: false
  },
  {
    id: 2,
    name: "Quản lý sinh viên",
    url: "/quan-ly-sinh-vien",
    isShow: false
  },
  {
    id: 3,
    name: "Quản lý giảng viên",
    url: "/quan-ly-giang-vien",
    isShow: false
  },
  {
    id: 4,
    name: "Quản lý thi",
    url: "/quan-ly-thi",
    isShow:true
  },
  // {
  //   id: 5,
  //   name: "Thiết lập",
  //   url: "/cai-dat",
  //   item: [
  //     {
  //       id: 6,
  //       name: "Cài đặt quyền",
  //       url: "/cai-dat-quyen",
  //     },
  //     {
  //       id: 7,
  //       name: "Thiết lập",
  //       url: "/thiet-lap",
  //     },
  //   ],
  // },
  // {
  //   id: 8,
  //   name: "Lịch làm việc",
  //   url: "/quan-ly-lich-lam-viec",
  // },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// @ts-ignore
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
// @ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
// @ts-ignore
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function LayoutNavigation({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [role,setRole] = React.useState("")
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  React.useEffect(() =>{
    const role = localStorage.getItem("role")
    if(role !== "admin"){
      router.push("/quan-ly-thi")
    }
    setRole(role)
  },[])
  return (
    <Box sx={{ display: "flex", width:"100%" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {!open ? (
            <IconButton
              // @ts-ignore
              color=""
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          )}
        </DrawerHeader>

        <List>
          {menus.map((text, index) => {
            if(role == "admin"){
              return  (
                <ListItem key={text.name} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() =>router.push(text.url)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
    
                    <ListItemText
                      primary={text.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            }
            else{
              if(text.isShow){
                return  (
                  <ListItem key={text.name} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      onClick={() =>router.push(text.url)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
      
                      <ListItemText
                        primary={text.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              }
              return null;
            }
          })}
        </List>
      </Drawer>
      <Box sx={{ display: "flex", width:"100%" }}>
        <main className="flex min-h-screen flex-col min-w-screen px-2 items-center justify-between min-w-full">
          {children }
        </main>
      </Box>
    </Box>
  );
}
