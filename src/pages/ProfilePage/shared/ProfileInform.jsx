import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Avatar,
  Grid,
  ButtonBase,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import {
  useUpdateByUserMutation,
  useUploadAvatarMutation,
} from "@/services/api/user";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { selectUser, setUserInfo } from "@/store/redux/user/reducer";
import dayjs from "dayjs";
import { useSnackbar } from "@/components/Snackbar";
import { Controller, useForm } from "react-hook-form";

const ProfileInform = () => {
  const { showSnackbar } = useSnackbar();
  const getMyInfo = useSelector(selectUser);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const myInfo = useSelector(selectUser);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      dob: null,
      gender: null,
      avatarUrl: "",
    },
  });

  const [updateUser, { isLoading: isLoadingUpdateUser }] =
    useUpdateByUserMutation();
  const [uploadAvatar, { isLoading: isLoadingUploadAvatar }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (getMyInfo) {
      reset({
        name: getMyInfo.name || "",
        email: getMyInfo.email || "",
        dob: getMyInfo.dob ? dayjs(getMyInfo.dob) : null,
        gender: getMyInfo.gender || null,
        avatarUrl: getMyInfo.avatarUrl || "",
      });
      setAvatar(getMyInfo.avatarUrl || null);
      setAvatarPreview(getMyInfo.avatarUrl || null);
    }
  }, [getMyInfo]);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0]; // Single file only
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showSnackbar("Vui lòng chọn một hình ảnh.", "warning");
      return;
    }

    try {
      const response = await uploadAvatar(file).unwrap();

      const newAvatarUrl = response.result.imageUrl;
      setAvatar(newAvatarUrl);
      setAvatarPreview(newAvatarUrl);
      // Update avatar in redux store
      dispatch(
        setUserInfo({
          ...getMyInfo,
          avatarUrl: newAvatarUrl,
        }),
      );
      showSnackbar("Upload hình ảnh thành công.", "success");
      e.target.value = ""; // Clear input
    } catch (error) {
      console.error(error);
      if (error & error.data && error.data.message) {
        showSnackbar(
          `Upload hình ảnh thất bại: ${error.data.message}`,
          "error",
        );
      }
    }
  };

  const handleUpdateUser = async (data) => {
    try {
      await updateUser({
        id: getMyInfo.id,
        name: data.name,
        avatarUrl: avatar,
        dob: data.dob ? dayjs(data.dob).format("YYYY-MM-DD") : null,
        gender: data.gender,
        roleIds: [], // Set empty array request backend requirement
      }).unwrap();
      showSnackbar("Cập nhật thông tin thành công.", "success");
    } catch (error) {
      if (error && error.data && error.data.message) {
        showSnackbar(
          `Cập nhật thông tin thất bại: ${error.data.message}`,
          "error",
        );
      }
    }
  };

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
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <Grid container>
            <Grid
              size={{ xl: 3, lg: 3, md: 12, sm: 12, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* TODO: Upload avatar */}
              <Box sx={{ mb: 2 }}>
                <ButtonBase
                  component="label"
                  role="undefined"
                  tabIndex={-1}
                  disabled={isLoadingUploadAvatar}
                  aria-label="Avatar image"
                  sx={{
                    borderRadius: "40px",
                    "&:has(:focus-visible)": {
                      outline: "2px solid",
                      outlineOffset: "2px",
                    },
                  }}
                >
                  <Avatar
                    alt={myInfo.name}
                    sx={{ width: 80, height: 80, bgcolor: "#ccc" }}
                    src={avatarPreview}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleUploadImage}
                  />
                </ButtonBase>
              </Box>

              <Typography variant="h6" fontWeight={"bold"} mt={2}>
                Thông tin chung
              </Typography>
              <Typography
                color="#666"
                variant="subtitle2"
                mt={2}
                mx={3}
                textAlign={"center"}
              >
                Thông tin cá nhân và cập nhật thông tin avatar của tài khoản
              </Typography>
            </Grid>

            {/* TODO: Update user information */}
            <Grid size={{ xl: 9, lg: 9, md: 12, sm: 12, xs: 12 }} px={4}>
              <Box mt={4}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Tên không được để trống" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Họ và tên"
                      size="small"
                      fullWidth
                      required
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  )}
                />
              </Box>

              <Box mt={4}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={getMyInfo.email}
                  size="small"
                  fullWidth
                  slotProps={{
                    input: { readOnly: true },
                  }}
                />
              </Box>

              <Box
                display={{
                  xl: "flex",
                  lg: "flex",
                  md: "block",
                  sm: "block",
                  xs: "block",
                }}
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={4}
                mt={3}
              >
                <Box>
                  <Typography variant="body1" mb={0.5}>
                    Ngày sinh
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <Controller
                        name="dob"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            value={field.value}
                            onChange={(newValue) => field.onChange(newValue)}
                          />
                        )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>

                <Box mt={{ xl: 0, lg: 0, md: 3, sm: 3, xs: 3 }}>
                  <Typography variant="body1" mb={0.5}>
                    Giới tính
                  </Typography>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field} row name="gender" sx={{ mt: 1 }}>
                        <FormControlLabel
                          value="MALE"
                          control={<Radio color="default" required />}
                          label="Nam"
                        />
                        <FormControlLabel
                          value="FEMALE"
                          control={<Radio color="default" required />}
                          label="Nữ"
                        />
                        <FormControlLabel
                          value="OTHER"
                          control={<Radio color="default" required />}
                          label="Khác"
                        />
                      </RadioGroup>
                    )}
                  />

                  {/* {!genderValue && (
                    <Typography color="error" variant="caption" sx={{ ml: 2 }}>
                      Giới tính không được để trống
                    </Typography>
                  )} */}
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
                  type="submit"
                  disabled={isLoadingUpdateUser}
                >
                  {isLoadingUpdateUser ? (
                    <Typography variant="body1">Đang lưu...</Typography>
                  ) : (
                    <Typography variant="body1">Lưu thay đổi</Typography>
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
