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
export default function SiginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = () => {};
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Box className="p-4 flex-col flex shadow-md rounded bg-white"  sx={{ border: '1px solid grey' }}>
        <FormControl fullWidth sx={{ m: 1, width: "40ch" }} variant="outlined">
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
        <FormControl variant="outlined" fullWidth sx={{ m: 1, width: "40ch" }}>
          <InputLabel htmlFor="outlined-adornment-password">
            Mật khẩu
          </InputLabel>
          <OutlinedInput
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
        <Link href={"/"} className="text-blue-500 text-xs italic text-right" >Quên mật khẩu</Link>
        <Button variant="contained">Đăng nhập</Button>
      </Box>
    </main>
  );
}
