import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUploadAvatarMutation,
} from "@/services/api/user";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { selectUser } from "@/store/redux/user/reducer";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const ProfileInform = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    dob: null,
    gender: null,
    avatarUrl: "",
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { id } = useParams();
  // const getMyInfo = useSelector(selectUser);

  const { data: dataGetUserById } = useGetUserByIdQuery();
  const [updateUser, { isLoading: isLoadingUpdateUser }] =
    useUpdateUserMutation();
  const [uploadAvatar] = useUploadAvatarMutation();

  // Load thông tin user hiện tại
  useEffect(() => {
    if (dataGetUserById) {
      setFormValues({
        name: dataGetUserById.name || "",
        email: dataGetUserById.email || "",
        dob: dataGetUserById.dob ? dayjs(dataGetUserById.dob) : null,
        gender: dataGetUserById.gender || null,
        avatarUrl: dataGetUserById.avatarUrl || "",
      });
      setAvatarPreview(dataGetUserById.avatarUrl || null);
    }
  }, [dataGetUserById]);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]; // Single file only
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn một file hình ảnh!",
        severity: "error",
      });
      return;
    }

    setIsUploadingImage(true);
    try {
      // Pass single file, not array
      await uploadAvatar(file).unwrap();
      setSnackbar({
        open: true,
        message: "Upload hình ảnh thành công!",
        severity: "success",
      });
      // refetch();
      e.target.value = ""; // Clear input
    } catch (error) {
      setSnackbar({
        open: true,
        message: error?.data?.message || "Upload hình ảnh thất bại!",
        severity: "error",
      });
      console.error("Lỗi upload:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser({
        name: formValues.name.trim(),
        avatarUrl: avatar,
        dob: formValues.dob, // dayjs object sẽ được convert trong API
        gender: formValues.gender,
        roleIds: [], // Set rỗng như backend yêu cầu
      }).unwrap();
    } catch (error) {
      console.error("Update user error:", error);

      // Xử lý lỗi cụ thể
      if (error.status === 400) {
        alert("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.");
      } else if (error.status === 404) {
        alert("Không tìm thấy người dùng.");
      } else {
        alert("Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.");
      }
    }
  };

  const isLoading = isLoadingUpdateUser || isUploadingImage;

  return (
    <Fragment>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateUser();
          }}
        >
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
              {/* Avatar với nút upload */}
              <Box sx={{ position: "relative", mb: 2 }}>
                <Avatar src={avatarPreview} sx={{ width: 100, height: 100 }} />
                <Button
                  component="label"
                  disabled={isLoading}
                  sx={{
                    position: "absolute",
                    bottom: -10,
                    right: -10,
                    minWidth: "auto",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  <PhotoCamera sx={{ fontSize: 16, color: "white" }} />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                </Button>
              </Box>

              <Typography variant="h6" mt={2}>
                Thông tin chung
              </Typography>
              <Typography
                variant="subtitle2"
                mt={2}
                mx={3}
                textAlign={"center"}
              >
                Thông tin cá nhân và cập nhật thông tin avatar của tài khoản
              </Typography>
            </Grid>

            <Grid size={{ xl: 9, lg: 9 }}>
              <Box sx={{ mr: 4, my: 4 }}>
                <Typography variant="subtitle1" fontWeight={500} mb={0.5}>
                  Tên người dùng *
                </Typography>
                <TextField
                  name="name"
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                  size="small"
                  fullWidth
                  required
                  error={!formValues.name.trim()}
                  helperText={
                    !formValues.name.trim() ? "Tên không được để trống" : ""
                  }
                />
              </Box>

              <Box sx={{ mr: 4, my: 4 }}>
                <Typography variant="subtitle1" fontWeight={500} mb={0.5}>
                  Địa chỉ email
                </Typography>
                <TextField
                  type="email"
                  value={formValues.email}
                  size="small"
                  fullWidth
                  slotProps={{
                    input: { readOnly: true },
                  }}
                />
              </Box>

              <Box display={"flex"} alignItems={"flex-start"} gap={4}>
                <Box sx={{ my: 4, flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={500} mb={0.5}>
                    Ngày sinh *
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        value={formValues.dob}
                        onChange={(newValue) =>
                          setFormValues({ ...formValues, dob: newValue })
                        }
                        slotProps={{
                          textField: {
                            size: "small",
                            fullWidth: true,
                            required: true,
                            error: !formValues.dob,
                            helperText: !formValues.dob
                              ? "Ngày sinh không được để trống"
                              : "",
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>

                <Box sx={{ my: 4, flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={500} mb={0.5}>
                    Giới tính *
                  </Typography>
                  <RadioGroup
                    row
                    name="gender"
                    value={formValues.gender || ""}
                    onChange={(e) =>
                      setFormValues({ ...formValues, gender: e.target.value })
                    }
                    sx={{ mt: 1 }}
                  >
                    <FormControlLabel
                      value="MALE"
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel
                      value="FEMALE"
                      control={<Radio />}
                      label="Nữ"
                    />
                    <FormControlLabel
                      value="OTHER"
                      control={<Radio />}
                      label="Khác"
                    />
                  </RadioGroup>
                  {!formValues.gender && (
                    <Typography color="error" variant="caption" sx={{ ml: 2 }}>
                      Giới tính không được để trống
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    mr: 4,
                  }}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Lưu thay đổi"
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Fragment>
  );
};

export default ProfileInform;
