import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import customTheme from "@/components/CustemTheme";
import { useState } from "react";
import { useForgotPasswordVerifyMutation } from "@/services/api/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ForgotPasswordVerify = () => {
  const outerTheme = useTheme();
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [forgotPasswordVerify, { isLoading }] =
    useForgotPasswordVerifyMutation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickShowOtp = () => setShowOtp((show) => !show);

  const handleMouseDownOtp = (event) => {
    event.preventDefault();
  };

  const handleMouseUpOtp = (event) => {
    event.preventDefault();
  };

  const handleShowSnackbar = (success, message) => {
    setSnackbar({
      open: true,
      message:
        message ||
        (success ? "Xác thực OTP thành công !" : "Xác thực OTP thất bại !"),
      severity: success ? "success" : "error",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleForgotPasswordVerify = async (data) => {
    try {
      const response = await forgotPasswordVerify({
        email: email,
        verificationCode: data?.verificationCode,
      }).unwrap();
      console.log("responseData", response);
      const token = response?.result?.forgotPasswordToken;
      localStorage.setItem("forgotPasswordToken", token);

      if (response) {
        handleShowSnackbar(true);
        setTimeout(() => {
          navigate("/forgot-password/reset-password", {
            state: { email, forgotPasswordToken: token },
          });
        }, 1000);
      }
    } catch (error) {
      const messageError =
        error?.message || error?.data?.message || "Xác thực OTP thất bại !";
      handleShowSnackbar(false, messageError);

      console.log("OTP verification failed:", error);
    }
  };

  const email = location.state?.email || "Không có email";
  console.log("Email received in VerifyAccount:", email);

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
        <Box
          borderRadius={4}
          p={12}
          sx={{ backgroundColor: "white", boxShadow: 1 }}
        >
          <h1 style={{ margin: 0, textAlign: "center" }}>Xác thực tài khoản</h1>

          <form onSubmit={handleSubmit(handleForgotPasswordVerify)}>
            <p style={{ margin: "20px 0", fontSize: "1.1rem" }}>
              Vui lòng nhập OTP chúng tôi đã gửi đến email của bạn.
            </p>

            <p
              style={{
                margin: "40px 0",
                fontSize: "1.1rem",
                fontWeight: 500,
              }}
            >
              {email}
            </p>

            <ThemeProvider theme={customTheme(outerTheme)}>
              <TextField
                id="verificationCode"
                label="Xác thực OTP"
                type={showOtp ? "text" : "password"}
                variant="outlined"
                fullWidth
                sx={{ mb: 4 }}
                disabled={isLoading}
                error={!!errors.verificationCode}
                helperText={errors.verificationCode?.message}
                {...register("verificationCode", {
                  required: "OTP không được để trống",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "OTP phải là 6 chữ số",
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showOtp ? "hide the OTP" : "display the OTP"
                        }
                        onClick={handleClickShowOtp}
                        onMouseDown={handleMouseDownOtp}
                        onMouseUp={handleMouseUpOtp}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showOtp ? <VisibilityOff /> : <Visibility />}
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
                "Xác nhận"
              )}
            </Button>
          </form>

          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: 500,
                fontSize: "1.1rem",
                marginTop: 36,
              }}
              to="/login"
            >
              Trở về đăng nhập
            </Link>
          </Box>
        </Box>
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

export default ForgotPasswordVerify;
