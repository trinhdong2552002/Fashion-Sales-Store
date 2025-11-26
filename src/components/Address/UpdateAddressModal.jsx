import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useUpdateAddressMutation } from "@/services/api/address";
import { useListWardsByDistrictQuery } from "@/services/api/district";
import {
  useListDistrictsByProvinceQuery,
  useListProvincesQuery,
} from "@/services/api/province";
import { useSnackbar } from "@/components/Snackbar";
import { Controller, useForm } from "react-hook-form";

export const UpdateAddressModal = ({ address, refetchGetAllAddress }) => {
  const [openModalUpdateAddress, setOpenModalUpdateAddress] = useState(false);

  // Separate state for selected IDs
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [selectedWardCode, setSelectedWardCode] = useState(null);
  const [checkedDefaultAddress, setCheckedDefaultAddress] = useState(false);

  const [updateAddress] = useUpdateAddressMutation();
  const { showSnackbar } = useSnackbar();
  const {
    control,
    reset,
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

  const handleOpenModalUpdateAddress = (e) => {
    e.stopPropagation();
    setOpenModalUpdateAddress(true);
  };

  const handleCloseModalUpdateAddress = (e) => {
    e.stopPropagation();
    setOpenModalUpdateAddress(false);
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

  // Initialize form with existing address data
  useEffect(() => {
    if (address) {
      reset({
        phone: address.phone || "",
        streetDetail: address.streetDetail || "",
      });
      setSelectedProvinceId(address.province?.id || null);
      setSelectedDistrictId(address.district?.id || null);
      setSelectedWardCode(address.ward?.code || null);
      setCheckedDefaultAddress(address.isDefault || false);
    }
  }, [address, reset]);

  const handleUpdateAddress = async (data) => {
    if (!selectedProvinceId || !selectedDistrictId || !selectedWardCode) {
      showSnackbar("Vui lòng chọn đầy đủ Tỉnh/Huyện/Xã", "warning");
      return;
    }

    try {
      await updateAddress({
        id: address.id,
        phone: data.phone,
        streetDetail: data.streetDetail,
        provinceId: selectedProvinceId,
        districtId: selectedDistrictId,
        wardCode: selectedWardCode,
        isDefault: checkedDefaultAddress,
      }).unwrap();
      setOpenModalUpdateAddress(false);
      refetchGetAllAddress();
      showSnackbar("Cập nhật địa chỉ thành công!", "success");
    } catch (error) {
      if (error && error.data && error.data.message) {
        showSnackbar(
          `Cập nhật địa chỉ thất bại! ${error.data.message}`,
          "error"
        );
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
          variant="outlined"
          color="error"
          onClick={handleOpenModalUpdateAddress}
        >
          Sửa
        </Button>
      </Box>

      {/* Nested modal update address */}
      <Dialog
        fullWidth
        open={openModalUpdateAddress}
        onClose={handleCloseModalUpdateAddress}
        aria-labelledby="update-address-dialog-title"
        aria-describedby="update-address-dialog-description"
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
          Cập nhật địa chỉ
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleUpdateAddress)}>
            {/* Phone number */}
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
                  value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                  message: "Số điện thoại không hợp lệ",
                },
              }}
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
                  fullWidth
                  label="Địa chỉ cụ thể"
                  type="text"
                  error={!!errors.streetDetail}
                  helperText={
                    errors.streetDetail ? errors.streetDetail.message : ""
                  }
                />
              )}
            />

            {/* Province */}
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="select-province-label">Tỉnh/thành phố</InputLabel>
              <Select
                labelId="select-province-label"
                id="select-province"
                value={selectedProvinceId || ""}
                label="Chọn tỉnh/thành phố"
                onChange={(e) => handleProvinceChange(e.target.value)}
              >
                {provinces.map((province) => (
                  <MenuItem key={province.id} value={province.id}>
                    {province.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* District  */}
            <FormControl fullWidth>
              <InputLabel id="select-district-label">Quận/huyện</InputLabel>
              <Select
                labelId="select-district-label"
                id="select-district"
                value={selectedDistrictId || ""}
                label="Chọn quận/huyện"
                onChange={(e) => handleDistrictChange(e.target.value)}
              >
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Ward */}
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel id="select-ward-label">Phường/xã</InputLabel>
              <Select
                labelId="select-ward-label"
                id="select-ward"
                value={selectedWardCode || ""}
                label="Chọn phường/xã"
                onChange={(e) => handleWardChange(e.target.value)}
              >
                {wards.map((ward) => (
                  <MenuItem key={ward.code} value={ward.code}>
                    {ward.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
          <Button variant="outlined" onClick={handleCloseModalUpdateAddress}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="error"
            type="submit"
            onClick={handleSubmit(handleUpdateAddress)}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
