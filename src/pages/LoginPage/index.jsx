import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, useLazyGetMyInfoQuery } from "@/services/api/auth";
import customTheme from "@/components/CustemTheme";

const Login = () => {
  const outerTheme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [login, { isLoading }] = useLoginMutation();
  const [triggerMyInfo] = useLazyGetMyInfoQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const handleShowSnackbar = (success, message) => {
    setSnackbar({
      open: true,
      message:
        message || (success ? "Đăng nhập thành công" : "Đăng nhập thất bại !"),
      severity: success ? "success" : "error",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleLogin = async (data) => {
    try {
      const response = await login({
        email: data?.email,
        password: data?.password,
      }).unwrap();

      if (response) {
        const role = response?.result?.roles?.[0]?.name;
        if (!role) throw new Error("Không thể xác định vai trò người dùng.");
        if (role === "ADMIN")
          throw new Error("Tài khoản ADMIN không thể đăng nhập.");
        if (role === "USER") {
          handleShowSnackbar(true);
          setTimeout(() => navigate("/"), 1000);
        }

        localStorage.setItem("accessToken", response?.result?.accessToken);
        localStorage.setItem("refreshToken", response?.result?.refreshToken);

        await triggerMyInfo();
      }
    } catch (error) {
      const messageError =
        error?.message || error?.data?.message || "Đăng nhập thất bại !";
      handleShowSnackbar(false, messageError);
      console.error("Login failed:", error);
    }
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        minHeight="100vh"
      >
        <Grid
          container
          sx={{
            width: "100%",
            maxWidth: 1000,
            px: 3,
            py: 6,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Grid size={{ xs: 6, md: 6 }}>
            <Box sx={{ m: "0 50px" }}>
              <h1 style={{ margin: 0 }}>Thông tin đăng nhập</h1>

              <p style={{ margin: "40px 0", fontSize: "1.1rem" }}>
                Bạn chưa có tài khoản ?
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: 500,
                    marginLeft: 6,
                  }}
                  to="/register"
                >
                  Tạo tài khoản ngay
                </Link>
              </p>

              <form onSubmit={handleSubmit(handleLogin)}>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    disabled={isLoading}
                    fullWidth
                    sx={{ mb: 4 }}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register("email", {
                      required: "Email không được để trống",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email không hợp lệ",
                      },
                    })}
                  />
                </ThemeProvider>

                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="password"
                    label="Mật khẩu"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    disabled={isLoading}
                    fullWidth
                    sx={{ mb: 4 }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register("password", {
                      required: "Mật khẩu không được để trống",
                      minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                      },
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                            disabled={isLoading}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </ThemeProvider>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    p: "10px 24px",
                    fontSize: "1.2rem",
                    fontWeight: "regular",
                    "&:hover": {
                      backgroundColor: "#333",
                    },
                  }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={34} color="inherit" />
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </form>

              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    marginTop: 30,
                  }}
                  to="/forgot-password"
                >
                  Bạn quên mật khẩu?
                </Link>

                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    marginTop: 20,
                  }}
                  to="/"
                >
                  Trở về trang chủ
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, md: 6 }}>
            <img
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
                objectFit: "cover",
              }}
              src="/src/assets/images/form/background-form.jpg"
              alt="Login background"
            />
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "right", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", p: "10px 20px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default Login;
