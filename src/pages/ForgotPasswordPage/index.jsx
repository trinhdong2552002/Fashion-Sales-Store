import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForgotPasswordMutation } from "@/services/api/auth";
import background_form from "@/assets/images/form/background-form.jpg";

const ForgotPassword = () => {
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
    <Box
      component={"main"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
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
                Quên mật khẩu
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
                Vui lòng nhập email của bạn và chúng tôi sẽ gửi cho bạn mã xác
                thực để đặt lại mật khẩu.
              </Typography>

              <form onSubmit={handleSubmit(handleForgotPassword)}>
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

                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{ fontSize: "1.2rem" }}
                >
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
                    "Xác nhận"
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
              <Typography
                component={Link}
                mt={3}
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
                Trở về đăng nhập
              </Typography>
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
              alt="Background form"
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
    </Box>
  );
};

export default ForgotPassword;
