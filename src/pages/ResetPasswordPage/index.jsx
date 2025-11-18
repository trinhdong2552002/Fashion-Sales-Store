import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import background_form from "@/assets/images/form/background-form.jpg";
import { useResetPasswordMutation } from "@/services/api/auth";
import { useSnackbar } from "@/components/Snackbar";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useSnackbar();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const forgotPasswordToken =
    location.state?.forgotPasswordToken ||
    localStorage.getItem("forgotPasswordToken");
  console.log("forgotPasswordToken", forgotPasswordToken);

  const email = location.state?.email || "Không có email";
  console.log("email", email);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpNewPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpConfirmPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword({
        forgotPasswordToken,
        email,
        newPassword: data?.newPassword,
        confirmPassword: data?.confirmPassword,
      }).unwrap();

      if (response) {
        localStorage.removeItem("forgotPasswordToken");
        showSnackbar(
          "Đặt lại mật khẩu thành công ! Vui lòng đăng nhập lại.",
          "success"
        );
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      if (error && error.data && error.data.message) {
        showSnackbar(`${error.data.message}`, "error");
        return;
      }
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
                Đặt lại mật khẩu
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
                Vui lòng nhập mật khẩu mới.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  id="newPassword"
                  label="Mật khẩu mới"
                  fullWidth
                  type={showNewPassword ? "text" : "password"}
                  variant="outlined"
                  sx={{ mb: 4 }}
                  disabled={isLoading}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                  {...register("newPassword", {
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
                            showNewPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownNewPassword}
                          onMouseUp={handleMouseUpNewPassword}
                          edge="end"
                          disabled={isLoading}
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  id="confirmPassword"
                  label="Xác nhận mật khẩu"
                  variant="outlined"
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  sx={{ mb: 4 }}
                  disabled={isLoading}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  {...register("confirmPassword", {
                    required: "Vui lòng xác nhận mật khẩu",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Mật khẩu xác nhận không khớp",
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showConfirmPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          onMouseUp={handleMouseUpConfirmPassword}
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
      </Box>
    </Box>
  );
};

export default ResetPassword;
