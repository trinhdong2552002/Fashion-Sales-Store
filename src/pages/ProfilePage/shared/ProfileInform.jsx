import { useGetMyInfoQuery } from "@/services/api/auth";
import { useListRolesQuery } from "@/services/api/role"; // Thêm import roleApi
import { setUser } from "@/store/redux/user/reducer";
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "@/services/api/user";

// Hàm kiểm tra xem chuỗi có phải là URL hợp lệ không
const isValidUrl = (string) => {
  if (!string) return false;
  const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return pattern.test(string);
};

const ProfileInform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const {
    data: userInfo,
    isLoading: infoLoading,
    error: infoError,
  } = useGetMyInfoQuery(undefined, {
    skip: !localStorage.getItem("accessToken"),
  });
  const { data: rolesData, isLoading: rolesLoading } = useListRolesQuery(); // Lấy danh sách roles
  const [updateUser, { isLoading: updateLoading, error: updateError }] =
    useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      gender: "",
      birthDate: { date: "", month: "", year: "" },
      avatarUrl: "",
      roles: [], // Thêm roles vào defaultValues
    },
  });

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  // Điền giá trị ban đầu từ userInfo hoặc user vào form
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    console.log("Access Token:", token); // Log token để debug

    if (userInfo?.result) {
      const userData = userInfo.result;
      setValue("name", userData.name || "");
      setValue("phone", userData.phone || "");
      setValue("gender", userData.gender || "");

      if (userData.dob) {
        const [year, month, date] = userData.dob.split("-").map(Number);
        setValue("birthDate.date", date || "");
        setValue("birthDate.month", month || "");
        setValue("birthDate.year", year || "");
      } else if (userData.birthDate) {
        setValue("birthDate.date", userData.birthDate.date || "");
        setValue("birthDate.month", userData.birthDate.month || "");
        setValue("birthDate.year", userData.birthDate.year || "");
      }

      setValue("avatarUrl", userData.avatarUrl || "");
      // Lấy role IDs từ userData
      if (userData.roles && Array.isArray(userData.roles)) {
        const roleIds = userData.roles.map((role) => role.id);
        setValue("roles", roleIds);
      }
      dispatch(setUser(userData));
    } else if (user) {
      setValue("name", user.name || "");
      setValue("phone", user.phone || "");
      setValue("gender", user.gender || "");

      if (user.dob) {
        const [year, month, date] = user.dob.split("-").map(Number);
        setValue("birthDate.date", date || "");
        setValue("birthDate.month", month || "");
        setValue("birthDate.year", year || "");
      } else if (user.birthDate) {
        setValue("birthDate.date", user.birthDate.date || "");
        setValue("birthDate.month", user.birthDate.month || "");
        setValue("birthDate.year", user.birthDate.year || "");
      }

      setValue("avatarUrl", user.avatarUrl || "");
      if (user.roles && Array.isArray(user.roles)) {
        const roleIds = user.roles.map((role) => role.id);
        setValue("roles", roleIds);
      }
    }
  }, [userInfo, user, setValue, dispatch, navigate]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login");
        return;
      }

      console.log("Form data:", data);

      const dob =
        data.birthDate.year && data.birthDate.month && data.birthDate.date
          ? `${data.birthDate.year}-${String(data.birthDate.month).padStart(
              2,
              "0"
            )}-${String(data.birthDate.date).padStart(2, "0")}`
          : undefined;

      if (data.avatarUrl && !isValidUrl(data.avatarUrl)) {
        alert(
          "URL ảnh đại diện không hợp lệ. Vui lòng nhập URL hợp lệ (bắt đầu bằng http:// hoặc https://)."
        );
        return;
      }

      const payload = {
        id: user?.id || userInfo?.result?.id,
        name: data.name,
        phone: data.phone,
        gender: data.gender,
        dob: dob,
        avatarUrl: data.avatarUrl,
        roles: data.roles, // Gửi roles dưới dạng mảng các ID
      };

      console.log("Data sent to API:", payload);

      const response = await updateUser(payload).unwrap();

      console.log("API response:", response);

      if (response) {
        dispatch(
          setUser({
            ...user,
            name: response.name,
            phone: response.phone,
            gender: response.gender,
            birthDate: data.birthDate,
            avatarUrl: response.avatarUrl,
            roles: response.roles,
          })
        );
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  if (infoLoading || rolesLoading) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  }

  if (infoError) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        Không thể tải thông tin:{" "}
        {infoError?.data?.message || "Lỗi không xác định"}
      </Typography>
    );
  }

  const avatarUrl = watch("avatarUrl");
  const selectedRoles = watch("roles");

  return (
    <Box
      sx={{
        border: "1px solid black",
        width: "100%",
        pt: 16,
        borderRadius: 5,
      }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <TextField
          variant="outlined"
          label="URL ảnh đại diện"
          size="small"
          color="default"
          sx={{ width: "300px", mb: 2 }}
          {...register("avatarUrl")}
        />
        {avatarUrl && isValidUrl(avatarUrl) ? (
          <Box sx={{ mt: 2 }}>
            <img
              src={avatarUrl}
              alt="Preview"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              onError={(e) => (e.target.src = "https://placehold.co/100x100")}
            />
          </Box>
        ) : (
          avatarUrl && (
            <Typography color="error" sx={{ mt: 1 }}>
              URL ảnh không hợp lệ
            </Typography>
          )
        )}
      </Stack>

      <Box sx={{ m: "24px 0 24px 64px" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          sx={{ m: "40px 0" }}
          spacing={24}
        >
          <Typography variant="h6">Email: </Typography>
          <Typography variant="body1">
            {userInfo?.result?.email || user?.email || "Chưa có email"}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          sx={{ m: "40px 0" }}
          spacing={26}
        >
          <Typography variant="h6">Tên: </Typography>
          <TextField
            variant="outlined"
            label="Nhập tên"
            size="small"
            color="default"
            sx={{ width: "300px" }}
            {...register("name")}
          />
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          sx={{ m: "40px 0" }}
          spacing={15}
        >
          <Typography variant="h6">Số điện thoại: </Typography>
          <TextField
            variant="outlined"
            label="Số điện thoại"
            size="small"
            color="default"
            sx={{ width: "300px" }}
            {...register("phone")}
          />
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          sx={{ m: "40px 0" }}
          spacing={21}
        >
          <Typography variant="h6">Giới tính:</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group"
            name="gender"
            value={watch("gender") || ""}
            onChange={(e) => setValue("gender", e.target.value)}
          >
            <FormControlLabel
              value="MALE"
              control={<Radio color="default" />}
              label="Nam"
            />
            <FormControlLabel
              value="FEMALE"
              control={<Radio color="default" />}
              label="Nữ"
            />
            <FormControlLabel
              value="OTHER"
              control={<Radio color="default" />}
              label="Khác"
            />
          </RadioGroup>
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          sx={{ m: "40px 0" }}
        >
          <Typography variant="h6" sx={{ width: "29%" }}>
            Ngày sinh:{" "}
          </Typography>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="date-label" color="default">
              Ngày
            </InputLabel>
            <Select
              labelId="date-label"
              id="date-select"
              value={watch("birthDate.date") || ""}
              label="Ngày"
              onChange={(e) => setValue("birthDate.date", e.target.value)}
              color="default"
            >
              <MenuItem value="">Ngày</MenuItem>
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="month-label" color="default">
              Tháng
            </InputLabel>
            <Select
              labelId="month-label"
              id="month-select"
              value={watch("birthDate.month") || ""}
              label="Tháng"
              onChange={(e) => setValue("birthDate.month", e.target.value)}
              color="default"
            >
              <MenuItem value="">Tháng</MenuItem>
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="year-label" color="default">
              Năm
            </InputLabel>
            <Select
              labelId="year-label"
              id="year-select"
              value={watch("birthDate.year") || ""}
              label="Năm"
              onChange={(e) => setValue("birthDate.year", e.target.value)}
              color="default"
            >
              <MenuItem value="">Năm</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          sx={{ m: "40px 0" }}
          spacing={22}
        >
          <Typography variant="h6">Vai trò:</Typography>
          <FormControl sx={{ m: 1, width: 300 }} size="small">
            <InputLabel id="roles-label">Chọn vai trò</InputLabel>
            <Select
              labelId="roles-label"
              id="roles-select"
              multiple
              value={selectedRoles || []}
              onChange={(e) => setValue("roles", e.target.value)}
              renderValue={(selected) =>
                selected
                  .map(
                    (id) =>
                      rolesData?.items.find((role) => role.id === id)?.name
                  )
                  .filter(Boolean)
                  .join(", ")
              }
              label="Chọn vai trò"
            >
              {rolesData?.items?.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  <Checkbox
                    checked={selectedRoles?.includes(role.id) || false}
                  />
                  <ListItemText primary={role.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          sx={{ m: "40px 0" }}
          spacing={22}
        >
          <Typography variant="h6">Địa chỉ: </Typography>
          <Typography variant="body1">
            {userInfo?.result?.address || user?.address || "Chưa có địa chỉ"}
          </Typography>
        </Stack>
      </Box>

      {updateError && (
        <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>
          Có lỗi xảy ra:{" "}
          {updateError?.data?.message || "Không thể cập nhật thông tin"}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--footer-background-color)",
            marginBottom: 6,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
          }}
          type="submit"
          disabled={updateLoading}
        >
          {updateLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Lưu thay đổi"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileInform;
