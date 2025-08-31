import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import customTheme from "@/components/CustemTheme";
import { useRegisterMutation } from "@/services/api/auth";
import background_form from "@/assets/images/form/background-form.jpg"

const Register = () => {
  const outerTheme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [registerAccount, { isLoading }] = useRegisterMutation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleShowSnackbar = (success, message) => {
    setSnackbar({
      open: true,
      message:
        message || (success ? "Đăng ký thành công !" : "Đăng ký thất bại !"),
      severity: success ? "success" : "error",
    });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleRegister = async (data) => {
    try {
      const response = await registerAccount({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.password,
      }).unwrap();

      if (response) {
        handleShowSnackbar(true);
        navigate("/register/verify-account", { state: { email: data.email } });
      }
    } catch (error) {
      const messageError =
        error?.message || error?.data?.message || "Đăng ký thất bại !";
      handleShowSnackbar(false, messageError);
      console.error("Register failed:", error);
    }
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box display="flex" alignItems="center" minHeight="100vh">
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
              <h1 style={{ margin: 0 }}>Tạo tài khoản</h1>

              <p style={{ margin: "20px 0", fontSize: "1.1rem" }}>
                Bạn đã có tài khoản ?
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: 500,
                    marginLeft: 6,
                  }}
                  to="/login"
                >
                  Đăng nhập
                </Link>
              </p>

              <form onSubmit={handleSubmit(handleRegister)}>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="name"
                    label="Họ và tên"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 4 }}
                    disabled={isLoading}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register("name", {
                      required: "Họ và tên không được để trống",
                      pattern: {
                        value: /^[A-Za-zÀ-Ỹà-ỹ0-9]+(?: [A-Za-zÀ-Ỹà-ỹ0-9]+)*$/,
                        message:
                          "Chỉ được sử dụng chữ cái, số và khoảng trắng, không có ký tự đặc biệt",
                      },
                    })}
                  />
                </ThemeProvider>

                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 4 }}
                    disabled={isLoading}
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
                    fullWidth
                    sx={{ mb: 4 }}
                    disabled={isLoading}
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
                            onClick={handleClickShowPassword}
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

                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    id="confirmPassword"
                    label="Xác nhận mật khẩu"
                    type={showConfirmPassword ? "text" : "password"}
                    variant="outlined"
                    sx={{ mb: 4 }}
                    fullWidth
                    disabled={isLoading}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    {...register("confirmPassword", {
                      required: "Vui lòng xác nhận mật khẩu",
                      validate: (value) =>
                        value === watch("password") ||
                        "Mật khẩu xác nhận không khớp",
                    })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                            disabled={isLoading}
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
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
                    padding: "10px 24px",
                    fontSize: "1.2rem",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={34} color="inherit" />
                  ) : (
                    "Đăng ký"
                  )}
                </Button>
              </form>
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
              src={background_form}
              alt="register background"
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
    </section>
  );
};

export default Register;
