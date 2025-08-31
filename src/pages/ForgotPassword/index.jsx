import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import customTheme from "@/components/CustemTheme";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/services/api/auth";
import background_form from "@/assets/images/form/background-form.jpg"

const ForgotPassword = () => {
  const outerTheme = useTheme();
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
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

  const handleShowSnackbar = (success, message) => {
    setSnackbar({
      open: true,
      message:
        message ||
        (success ? "Xác nhận email thành công !" : "Xác nhận email thất bại !"),
      severity: success ? "success" : "error",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleForgotPassword = async (data) => {
    try {
      const response = await forgotPassword({
        email: data?.email,
      }).unwrap();
      console.log("response", response);

      if (response) {
        handleShowSnackbar(true);
        setTimeout(() => {
          navigate("/forgot-password/forgot-password-verify", {
            state: { email: data.email },
          });
        }, 1000);
      }
    } catch (error) {
      const messageError =
        error?.message || error?.data?.message || "Xác nhận email thất bại !";
      handleShowSnackbar(false, messageError);
      console.log("Verify account failed:", error);
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
              <h1 style={{ margin: 0 }}>Quên mật khẩu</h1>

              <p style={{ margin: "40px 0", fontSize: "1.1rem" }}>
                Nhập email của bạn và chúng tôi sẽ gửi cho bạn liên kết để đặt
                lại mật khẩu.
              </p>

              <form onSubmit={handleSubmit(handleForgotPassword)}>
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
                    "Xác nhận email"
                  )}
                </Button>
              </form>
            </Box>

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
                  marginTop: 36,
                }}
                to="/login"
              >
                Trở về đăng nhập
              </Link>
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
            />
          </Grid>
        </Grid>

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
    </section>
  );
};

export default ForgotPassword;
