import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField as DialogTextField,
  FormControl,
  InputLabel,
  Select as DialogSelect,
  MenuItem,
  Paper,
  Checkbox,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useSnackbar } from "@/components/Snackbar";
import {
  useGetAllAddressByUserQuery,
  useHideAddressMutation,
  useUpdateAddressMutation,
} from "@/services/api/address";

const AddressList = () => {
  const { showSnackbar } = useSnackbar();
  const [openModalHideAddress, setOpenModalHideAddress] = useState(false);
  const [openModalUpdateAddress, setOpenModalUpdateAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const [addressId, setAddressId] = useState(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [selectedWardCode, setSelectedWardCode] = useState(null);
  const [checkedDefaultAddress, setCheckedDefaultAddress] = useState(false);

  const [city, setCity] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [streetDetail, setStreetDetail] = useState("");
  const [phone, setPhone] = useState("");

  const {
    data: dataGetAllAddress,
    isLoading: isLoadingGetAllAddress,
    isError: isErrorGetAllAddress,
    error: errorGetAllAddress,
    refetch: refetchGetAllAddress,
  } = useGetAllAddressByUserQuery({
    pageNo: 1,
    pageSize: 100,
  });

  const [hideAddress] = useHideAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  useEffect(() => {
    refetchGetAllAddress();
  }, []);

  const handleCheckboxDefaultAddress = (e) => {
    setCheckedDefaultAddress(e.target.checked);
  };

  const handleOpenModalHideAddress = (id) => {
    setAddressId(id);
    setOpenModalHideAddress(true);
  };

  const handleCloseModalHideAddress = () => {
    setOpenModalHideAddress(false);
    setAddressId(null);
  };

  const handleOpenModalUpdateAddress = () => {
    setOpenModalUpdateAddress(true);
  };

  const handleCloseModalUpdateAddress = () => {
    setOpenModalUpdateAddress(false);
    setEditAddress(null);
    setSelectedCity("");
    setSelectedDistrict("");
    setWard("");
    setStreetDetail("");
    setPhone("");
    setCheckedDefaultAddress(false);
  };

  const handleHideAddress = async () => {
    if (!addressId) return;

    try {
      await hideAddress({ id: addressId }).unwrap();
      setOpenModalHideAddress(false);
      setAddressId(null);
      refetchGetAllAddress();
      showSnackbar("Xoá địa chỉ thành công!", "success");
    } catch (error) {
      if (error && error.data && error.data.message) {
        showSnackbar(`${error.data.message}`, "error");
        return;
      }
    }
  };

  const handleUpdateAddress = async (data) => {
    if (!selectedProvinceId || !selectedDistrictId || !selectedWardCode) {
      showSnackbar("Vui lòng chọn đầy đủ Tỉnh/Huyện/Xã", "warning");
      return;
    }

    try {
      await updateAddress({
        id: data.id,
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

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={"bold"}
          fontSize={{
            xl: "1.6rem",
            lg: "1.6rem",
            md: "1.4rem",
            sm: "1.2rem",
            xs: "1.2rem",
          }}
        >
          Danh sách địa chỉ
        </Typography>

        <Button
          variant="contained"
          // onClick={() => navigate(`/account-information/new-address/${id}`)}
        >
          Thêm địa chỉ mới
        </Button>
      </Box>
      {dataGetAllAddress?.result?.items.length === 0 ? (
        <Typography
          variant="body1"
          fontSize={{ xs: "0.9rem", sm: "1rem", md: "1rem" }}
          color="#666"
          textAlign={"center"}
        >
          Chưa có địa chỉ nào.
        </Typography>
      ) : (
        <Fragment>
          {dataGetAllAddress?.result?.items.map((address) => (
            <Paper
              key={address.id}
              elevation={2}
              sx={{
                p: 4,
                mb: 3,
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  fontSize={{ xs: "0.9rem", sm: "1rem", md: "1rem" }}
                >
                  {address.phone}
                </Typography>
                <Typography
                  variant="body1"
                  fontSize={{ xs: "0.9rem", sm: "1rem", md: "1rem" }}
                >
                  {address.streetDetail}, {address.ward.name},{" "}
                  {address.district.name}, {address.province.name}
                </Typography>
                {address.isDefault && (
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    fontSize={{ xs: "0.9rem", sm: "1rem", md: "1rem" }}
                  >
                    Địa chỉ mặc định
                  </Typography>
                )}
              </Box>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button
                  variant="outlined"
                  onClick={handleOpenModalUpdateAddress}
                  disabled={address.invisible}
                >
                  Sửa
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleOpenModalHideAddress(address.id)}
                  disabled={address.invisible}
                >
                  Xoá
                </Button>
              </Box>
            </Paper>
          ))}
        </Fragment>
      )}

      {/* TODO: Dialog confirm delete */}
      <Dialog open={openModalHideAddress} onClose={handleCloseModalHideAddress}>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "1rem",

              md: "1.2rem",
            },
          }}
        >
          Xác nhận xoá địa chỉ ?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseModalHideAddress}
            sx={{
              fontSize: {
                xs: "0.9rem",
                md: "1rem",
              },
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleHideAddress()}
            sx={{
              fontSize: {
                xs: "0.9rem",
                md: "1rem",
              },
            }}
          >
            Xoá
          </Button>
        </DialogActions>
      </Dialog>

      {/* TODO: Dialog update address */}
      <Dialog
        open={openModalUpdateAddress}
        onClose={handleCloseModalUpdateAddress}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Cập nhật địa chỉ</DialogTitle>
        <DialogContent>
          <Box spacing={4} sx={{ mt: 2 }}>
            <FormControl size="small" sx={{ width: "100%" }}>
              <InputLabel>Tỉnh/Thành phố</InputLabel>
              <DialogSelect
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedDistrict("");
                  setWard("");
                  setDistricts([]);
                  setWards([]);
                }}
                label="Tỉnh/Thành phố"
              >
                {city.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </DialogSelect>
            </FormControl>
            <FormControl size="small" sx={{ width: "100%" }}>
              <InputLabel>Quận/Huyện</InputLabel>
              <DialogSelect
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setWard("");
                  setWards([]);
                }}
                label="Quận/Huyện"
              >
                {districts.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </DialogSelect>
            </FormControl>
            <FormControl size="small" sx={{ width: "100%" }}>
              <InputLabel>Phường/Xã</InputLabel>
              <DialogSelect
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                label="Phường/Xã"
              >
                {wards.map((w) => (
                  <MenuItem key={w.code} value={w.code}>
                    {w.name}
                  </MenuItem>
                ))}
              </DialogSelect>
            </FormControl>
            <DialogTextField
              label="Địa chỉ"
              variant="outlined"
              size="small"
              value={streetDetail}
              onChange={(e) => setStreetDetail(e.target.value)}
              fullWidth
            />
            <DialogTextField
              label="Số điện thoại"
              variant="outlined"
              size="small"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
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
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" color="default" onClick={handleCloseModalUpdateAddress}>
            Hủy
          </Button>
          <Button
            sx={{ color: "white", backgroundColor: "black" }}
            variant="contained"
            // onClick={handleUpdate}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AddressList;
