import { TextField } from "@mui/material";
const InputComponent = ({
  label = "",
  defaultValue = "",
  onChangeText,
  error = false,
  handleClickShowPassword,
  type = "text",
  handleMouseDownPassword,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <TextField
        error
        id="outlined-error"
        label={label}
        defaultValue={defaultValue}
        type={showPassword ? "text" : "password"}
        onClick={handleClickShowPassword}
        endAdornment={
          type === "password" ? (
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
          ) : null
        }
      />
    </div>
  );
};

export default InputComponent;
