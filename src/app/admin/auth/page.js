"use client";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import * as React from "react";
import Box from "@mui/material/Box";
import axiosInstance from "@/axios/api-config";
import { auth } from "../../../axios/endpoints";
import { setLocalData, setToken } from "@/axios/handle-token";
import { useRouter } from "next/navigation";
import { Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLoading } from "@/context/loading-context";
import { toast } from "react-toastify";

export default function SiginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handeApi = () => {
    showLoading()
    axiosInstance
      .post(auth, {
        username: account,
        password: password,
      })
      .then((response) => {
        if (response && response.data) {
          toast.success("Đăng nhập thành công")
          hideLoading();
          setToken(response.data.data.token);
          setLocalData(response.data.data);
          router.replace("/bang-dieu-khien");
        } else {
          toast.error("Thông tin chưa hợp lệ")
          setShowSnackbar(true);
        }
      }).finally(()=>{ hideLoading();})
     
  };
  const cooperation_unit = [
    "/f.png",
    "/dhcn.png",
    "/2.png",
    "/hsb.png",
    "/stkbg.png",
    "/sis.png",
    "/ul.png",
    "/ued.png",
    "/ump.png",
    "/vju.png",
    "/vnu-hcm.png",
  ];

  const handleMouseDownPassword = () => {};
  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => setShowSnackbar(false)}
      >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setShowSnackbar(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message="Sai thông tin tài khoản mật khẩu"
        action={action}
      />
      <div className="flex felx-row w-screen  ">
        <Box
          className="p-4 flex-col flex rounded bg-white items-center span-2  justify-center border-none h-screen"
          sx={{ border: "1px solid grey" }}
        >
          <img src="/logo.png" className="w-[100px]" />
          <div className="h-[10px]" />
          <div className="font-extrabold">Trung tâm Thể dục & Thể thao</div>
          <div className="h-[5px]" />
          <div className="font-extrabold">Đại học Quốc gia Hà Nội</div>
          <div className="h-[10px]" />
          <div className="w-full text-sm font-medium">Đăng nhập hệ thống</div>
          <div></div>
          <FormControl
            fullWidth
            sx={{ m: 1, width: "40ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment">Tài khoản</InputLabel>
            <OutlinedInput
              className="w-full "
              id="component-outlined"
              defaultValue=""
              label="Name"
              onChange={(event) => {
                setAccount(event.target.value);
              }}
            />
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            sx={{ m: 1, width: "40ch" }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Mật khẩu
            </InputLabel>
            <OutlinedInput
              onChange={(value) => setPassword(value.target.value)}
              className="w-full"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Link
            href={"/"}
            className="text-blue-500 text-xs italic text-right w-full"
          >
            Quên mật khẩu
          </Link>
          <Button variant="contained" onClick={() => handeApi()}>
            Đăng nhập
          </Button>
        </Box>
        <Box className="p-4 flex-col flex shadow-md rounded bg-white items-center w-screen justify-center">
          <img src="/logo.png" className="w-[200px]" />

          <div className="h-[10px]" />
          <div className="font-extrabold text-[#0388db] text-lg">
            Đại học Quốc gia Hà Nội
          </div>

          <div className="h-[5px]" />
          <div className="font-extrabold text-[#0388db] text-lg">
            Trung tâm Thể dục & Thể thao
          </div>
          <div className="h-[5px]" />
          <div className="font-extrabold  text-lg">
            VNU – CENTER FOR PHYSICAL EDUCATION AND SPORTS
          </div>
          <div>Địa chỉ: 144 Xuân Thủy, Cầu Giấy, Hà Nội</div>
          <div>Điện thoại: 02435578980</div>
          <div>Email: ttgdtc@vnu.edu.vn</div>
          <div className="h-[50px]" />
          <div className="flex justify-center flex-col items-center">
            <div className="font-extrabold  text-lg">Các đơn vị hợp tác</div>
            <div className="h-[20px]" />
            <div className="flex flex-row">
              {cooperation_unit.map((m,index) => (
                <img src={m} key={index} className="w-[100px] h-[100px]" />
              ))}
            </div>
          </div>
        </Box>
      </div>
    </main>
  );
}
