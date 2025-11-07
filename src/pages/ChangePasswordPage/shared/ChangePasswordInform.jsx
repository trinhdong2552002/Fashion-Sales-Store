import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  useChangePasswordMutation,
  useGetMyInfoQuery,
} from "@/services/api/auth";

const ChangePasswordInform = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useGetMyInfoQuery();
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const newPassword = watch("newPassword");

  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    if (userError) {
      setSnackbar({
        open: true,
        message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!",
        severity: "error",
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [userError, navigate]);

  const handleChangePassword = async (data) => {
    try {
      await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();
      setSnackbar({
        open: true,
        message: "Đổi mật khẩu thành công!",
        severity: "success",
      });
      reset();
      setTimeout(() => {
        navigate(`/account-information/profile/${id}`);
      }, 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error?.data?.message || "Đổi mật khẩu thất bại!",
        severity: "error",
      });
    }
  };


  if (isUserLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        width: "100%",
        py: 4,
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <Grid container>
          <Grid
            size={{ xl: 3, lg: 3 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" mt={2}>
              Thông tin mật khẩu
            </Typography>
            <Typography variant="subtitle2" mt={2} mx={3} textAlign={"center"}>
              Thông tin mật khẩu và đổi mật khẩu
            </Typography>
          </Grid>

          <Grid size={{ xl: 9, lg: 9 }}>
            <Box sx={{ mr: 4, my: 4 }}>
              <Typography variant="subtitle1" fontWeight={500} mb={0.5}>
                Mật khẩu hiện tại
              </Typography>
              <TextField
                fullWidth
                size="small"
                color="default"
                type={showCurrentPassword ? "text" : "password"}
                disabled={isChangePasswordLoading}
                {...register("currentPassword", {
                  required: "Mật khẩu hiện tại không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showCurrentPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowCurrentPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        disabled={isChangePasswordLoading}
                      >
                        {showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mr: 4, my: 4 }}>
              <Typography variant="subtitle1" fontWeight={500} mb={0.5}>
                Mật khẩu mới
              </Typography>
              <TextField
                fullWidth
                size="small"
                color="default"
                type={showNewPassword ? "text" : "password"}
                disabled={isChangePasswordLoading}
                {...register("newPassword", {
                  required: "Mật khẩu mới không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
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
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        disabled={isChangePasswordLoading}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mr: 4, my: 4 }}>
              <Typography variant="subtitle1" fontWeight={500} mb={0.5}>
                Xác nhận mật khẩu
              </Typography>
              <TextField
                fullWidth
                size="small"
                color="default"
                type={showConfirmPassword ? "text" : "password"}
                disabled={isChangePasswordLoading}
                {...register("confirmPassword", {
                  required: "Xác nhận mật khẩu không được để trống",
                  validate: (value) =>
                    value === newPassword || "Mật khẩu xác nhận không khớp",
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        disabled={isChangePasswordLoading}
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
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            disabled={isChangePasswordLoading}
            sx={{
              backgroundColor: "black",
            }}
          >
            {isChangePasswordLoading ? "Đang xử lý..." : "Lưu thay đổi"}
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChangePasswordInform;
