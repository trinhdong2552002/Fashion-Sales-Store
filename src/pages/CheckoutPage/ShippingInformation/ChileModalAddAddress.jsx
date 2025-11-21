import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useCreateAddressMutation } from "@/services/api/address";
import { useListWardsByDistrictQuery } from "@/services/api/district";
import {
  useListDistrictsByProvinceQuery,
  useListProvincesQuery,
} from "@/services/api/province";
import { useSnackbar } from "@/components/Snackbar";
import { Controller, useForm } from "react-hook-form";
import { Add } from "@mui/icons-material";

export const ChildModalAddAddress = ({ address, refetchGetAllAddress }) => {
  const [openModalAddAddress, setOpenModalAddAddress] = useState(false);

  // Separate state for selected id to know which one is selected
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [selectedWardCode, setSelectedWardCode] = useState(null);
  const [checkedDefaultAddress, setCheckedDefaultAddress] = useState(false);

  const [createAddress] = useCreateAddressMutation();
  const { showSnackbar } = useSnackbar();
  const {
    // Use control: Controlled Component instead of register: Uncontrolled Component
    control,
    // Use reset function to set default values when editing no need create state react manual for each phone, streetDetail
    reset,
    // The function will receive the form data when form is submitted
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      streetDetail: "",
      province: "",
      district: "",
      ward: "",
    },
  });

  // Fetch provinces
  const { data: dataListProvince } = useListProvincesQuery(
    {
      pageNo: 1,
      pageSize: 100,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // Fetch districts by selected province
  const { data: dataDistrictsByProvince } = useListDistrictsByProvinceQuery(
    { id: selectedProvinceId, pageNo: 1, pageSize: 100 },
    {
      // If skip: true not call api when selectedProvinceId is null/undefined
      // after select province then call api to get districts
      skip: !selectedProvinceId,
      refetchOnMountOrArgChange: true,
    }
  );

  // Fetch wards by selected district
  const { data: dataWardsByDistrict } = useListWardsByDistrictQuery(
    {
      id: selectedDistrictId,
      pageNo: 1,
      pageSize: 100,
    },
    {
      skip: !selectedDistrictId,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleCheckboxDefaultAddress = (e) => {
    setCheckedDefaultAddress(e.target.checked);
  };

  const handleOpenModalAddAddress = (e) => {
    e.stopPropagation();
    setOpenModalAddAddress(true);
  };

  const handleCloseModalAddAddress = (e) => {
    e.stopPropagation();
    setOpenModalAddAddress(false);
  };

  const handleProvinceChange = (provinceId) => {
    setSelectedProvinceId(provinceId);
    setSelectedDistrictId(null);
    setSelectedWardCode(null);
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrictId(districtId);
    setSelectedWardCode(null);
  };

  const handleWardChange = (wardCode) => {
    setSelectedWardCode(wardCode);
  };

  const handleAddAddress = async (data) => {
    if (!selectedProvinceId || !selectedDistrictId || !selectedWardCode) {
      showSnackbar("Vui lòng chọn đầy đủ Tỉnh/Huyện/Xã", "warning");
      return;
    }

    try {
      await createAddress({
        phone: data.phone,
        streetDetail: data.streetDetail,
        provinceId: selectedProvinceId,
        districtId: selectedDistrictId,
        wardCode: selectedWardCode,
        isDefault: checkedDefaultAddress,
      }).unwrap();
      setOpenModalAddAddress(false);
      refetchGetAllAddress();
      showSnackbar("Thêm địa chỉ thành công!", "success");
    } catch (error) {
      if (error && error.data && error.data.message) {
        showSnackbar(`Thêm địa chỉ thất bại! ${error.data.message}`, "error");
        return;
      }
    }
  };

  const provinces = dataListProvince?.result?.items || [];
  const districts = dataDistrictsByProvince?.result?.items || [];
  const wards = dataWardsByDistrict?.result?.items || [];

  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent="flex-end"
        gap={2}
        mt={2}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenModalAddAddress}
        >
          Thêm địa chỉ
        </Button>
      </Box>

      {/* Nested modal add address */}
      <Dialog
        fullWidth
        open={openModalAddAddress}
        onClose={handleCloseModalAddAddress}
        aria-labelledby="add-address-dialog-title"
        aria-describedby="add-address-dialog-description"
        aria-hidden={!openModalAddAddress}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle
          variant="h4"
          fontWeight={"bold"}
          fontSize={{
            xl: "1.6rem",
            lg: "1.6rem",
            md: "1.4rem",
            sm: "1.2rem",
            xs: "1.1rem",
          }}
        >
          Thêm địa chỉ
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleAddAddress)}>
            {/* Phone number */}
            {/* TODO: This component to check validation controlled component */}
            {/* https://react-hook-form.com/docs/usecontroller/controller */}
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Số điện thoại không được để trống",
                minLength: {
                  value: 10,
                  message: "Số điện thoại phải có ít nhất 10 chữ số",
                },
                pattern: {
                  // TODO: Validate phone number Vietnamese
                  // https://gist.github.com/tungvn/2460c5ba947e5cbe6606c5e85249cf04
                  value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                  message: "Số điện thoại không hợp lệ",
                },
              }}
              // TODO: View doc how to use object field effect
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value}
                  sx={{
                    my: 2,
                  }}
                  type="tel"
                  fullWidth
                  label="Số điện thoại"
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : ""}
                />
              )}
            />

            {/* Address street */}
            <Controller
              name="streetDetail"
              control={control}
              rules={{ required: "Địa chỉ cụ thể không được để trống" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value}
                  type="text"
                  fullWidth
                  label="Địa chỉ cụ thể"
                  error={!!errors.streetDetail}
                  helperText={
                    errors.streetDetail ? errors.streetDetail.message : ""
                  }
                />
              )}
            />

            {/* Province */}
            {/* MUI just wrap one input component if than or more will show message: There are multiple InputBase components inside a FormControl. */}
            <Controller
              name="province"
              control={control}
              rules={{ required: "Bạn chưa chọn tỉnh/thành phố" }}
              render={({ field }) => (
                <FormControl fullWidth sx={{ my: 2 }} error={!!errors.province}>
                  <InputLabel id="select-province-label">
                    Tỉnh/thành phố
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="select-province-label"
                    id="select-province"
                    value={field.value || ""}
                    label="Chọn tỉnh/thành phố"
                    onChange={(e) => {
                      field.onChange(e);
                      handleProvinceChange(e.target.value);
                    }}
                  >
                    {provinces.map((province) => (
                      <MenuItem key={province.id} value={province.id}>
                        {province.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.province ? errors.province.message : ""}
                  </FormHelperText>
                </FormControl>
              )}
            />

            {/* District  */}
            <Controller
              name="district"
              control={control}
              rules={{ required: "Bạn chưa chọn quận/huyện" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.district}>
                  <InputLabel id="select-district-label">Quận/huyện</InputLabel>
                  <Select
                    {...field}
                    labelId="select-district-label"
                    id="select-district"
                    value={field.value || ""}
                    label="Chọn quận/huyện"
                    onChange={(e) => {
                      field.onChange(e);
                      handleDistrictChange(e.target.value);
                    }}
                  >
                    {districts.map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.district ? errors.district.message : ""}
                  </FormHelperText>
                </FormControl>
              )}
            />

            {/* Ward */}
            <Controller
              name="ward"
              control={control}
              rules={{ required: "Bạn chưa chọn phường/xã" }}
              render={({ field }) => (
                <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.ward}>
                  <InputLabel id="select-ward-label">Phường/xã</InputLabel>
                  <Select
                    {...field}
                    labelId="select-ward-label"
                    id="select-ward"
                    value={field.value || ""}
                    label="Chọn phường/xã"
                    onChange={(e) => {
                      field.onChange(e);
                      handleWardChange(e.target.value);
                    }}
                  >
                    {wards.map((ward) => (
                      <MenuItem key={ward.code} value={ward.code}>
                        {ward.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.ward ? errors.ward.message : ""}
                  </FormHelperText>
                </FormControl>
              )}
            />

            {/* Default address checkbox */}
            <Box display="flex" alignItems="center" my={2}>
              <Checkbox
                color="default"
                checked={checkedDefaultAddress}
                onChange={handleCheckboxDefaultAddress}
                slotProps={{
                  input: { "aria-label": "controlled" },
                }}
              />
              <Typography
                variant="body1"
                fontSize={{ xs: "0.8rem", sm: "0.9rem", md: "1rem" }}
              >
                Đặt làm địa chỉ mặc định
              </Typography>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseModalAddAddress}>
            Hủy
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(handleAddAddress)}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
