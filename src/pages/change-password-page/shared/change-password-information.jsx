import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  useChangePasswordMutation,
  useGetMyInfoQuery,
} from "@/services/api/auth";
import { useSnackbar } from "@/components/snackbar";

const ChangePasswordInform = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    data: dataUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetMyInfoQuery();
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

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

  useEffect(() => {
    if (isErrorUser) {
      showSnackbar(
        "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!",
        "error",
      );
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [isErrorUser, navigate]);

  const handleChangePassword = async (data) => {
    try {
      await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();
      showSnackbar("Đổi mật khẩu thành công!", "success");
      reset();
    } catch (error) {
      if (error && error.data && error.data.message) {
        showSnackbar(`${error.data.message}`, "error");
        return;
      }
    }
  };

  return (
    <Fragment>
      <Paper elevation={3} sx={{ p: 4 }}>
        {isErrorUser ? (
          <Typography color="error">
            {errorUser?.data?.message ||
              "Đã có lỗi xảy ra khi tải thông tin người dùng."}
          </Typography>
        ) : (
          dataUser && (
            <form onSubmit={handleSubmit(handleChangePassword)}>
              <Grid container spacing={3}>
                <Grid
                  size={{ xl: 3, lg: 3, md: 12, sm: 12, xs: 12 }}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight={"bold"} my={2}>
                    Thông tin mật khẩu
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="#666"
                    textAlign={"center"}
                  >
                    Thông tin mật khẩu và đổi mật khẩu
                  </Typography>
                </Grid>

                <Grid size={{ xl: 9, lg: 9, md: 12, sm: 12, xs: 12 }}>
                  <Box
                    sx={{
                      mb: 4,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Mật khẩu hiện tại"
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

                  <Box
                    sx={{
                      mb: 4,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Mật khẩu mới"
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
                              {showNewPassword ? (
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

                  <Box
                    sx={{
                      mb: 4,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Xác nhận mật khẩu mới"
                      size="small"
                      color="default"
                      type={showConfirmPassword ? "text" : "password"}
                      disabled={isChangePasswordLoading}
                      {...register("confirmPassword", {
                        required: "Xác nhận mật khẩu không được để trống",
                        validate: (value) =>
                          value === newPassword ||
                          "Mật khẩu xác nhận không khớp",
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
                >
                  {isChangePasswordLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </Button>
              </Box>
            </form>
          )
        )}
      </Paper>
    </Fragment>
  );
};

export default ChangePasswordInform;
