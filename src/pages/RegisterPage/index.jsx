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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/services/api/auth";
import background_form from "@/assets/images/form/background-form.jpg";

const Register = () => {
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
    <Box
      component={"section"}
      sx={{
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
            px: {
              xl: 3,
              lg: 3,
              md: 3,
              sm: 0,
              xs: 0,
            },
            py: 6,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            mx: {
              md: 2,
              sm: 2,
              xs: 2,
            },
          }}
        >
          <Grid size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}>
            <Box sx={{ m: "0 50px" }}>
              <Typography
                fontWeight={"bold"}
                sx={{
                  fontSize: {
                    md: "1.6rem",
                    lg: "1.6rem",
                    xl: "1.6rem",
                    sm: "1.4rem",
                    xs: "1.4rem",
                  },
                  textAlign: "center",
                }}
              >
                Tạo tài khoản
              </Typography>

              <Typography
                my={4}
                sx={{
                  fontSize: {
                    md: "1.1rem",
                    lg: "1.1rem",
                    xl: "1.1rem",
                    sm: "1rem",
                    xs: "1rem",
                  },
                  textAlign: {
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                Bạn đã có tài khoản ?
                <Typography
                  component={Link}
                  ml={1}
                  sx={{
                    textDecoration: "none",
                    color: "#666",
                    fontSize: {
                      md: "1.1rem",
                      lg: "1.1rem",
                      xl: "1.1rem",
                      sm: "1rem",
                      xs: "1rem",
                    },
                    transition: "0.2s",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                  to="/login"
                >
                  Đăng nhập
                </Typography>
              </Typography>

              <form onSubmit={handleSubmit(handleRegister)}>
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

                <Button fullWidth type="submit">
                  {isLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress
                        size={34}
                        color="inherit"
                        sx={{ mr: 1 }}
                      />
                    </Box>
                  ) : (
                    "Đăng ký"
                  )}
                </Button>
              </form>
            </Box>
          </Grid>

          <Grid
            size={{
              xl: 6,
              lg: 6,
              md: 6,
            }}
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
                objectFit: "cover",
              }}
              draggable="false"
              src={background_form}
              alt="background form"
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
    </Box>
  );
};

export default Register;
