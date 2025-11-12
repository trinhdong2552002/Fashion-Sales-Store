import { useGetAllAddressByUserQuery } from "@/services/api/address";
import { useListWardsQuery } from "@/services/api/ward";
import { Add, Book, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";

const ShippingInformation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [openModalAddressBook, setOpenModalAddressBook] = useState(false);

  const {
    data: dataGetAllAddress,
    isLoading,
    isError,
    error,
  } = useGetAllAddressByUserQuery(
    {
      pageNo: 1,
      pageSize: 1000,
    },
    { refetchOnMountOrArgChange: true }
  );
  const { data: dataGetAllWards } = useListWardsQuery({
    pageNo: 1,
    pageSize: 1000,
    refetchOnMountOrArgChange: true,
  });

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddressStreet(event.target.value);
  };

  const handleWardChange = (event) => {
    setWard(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleOpenModalAddressBook = () => {
    setOpenModalAddressBook(true);
  };

  const handleCloseModalAddressBook = () => {
    setOpenModalAddressBook(false);
  };

  const addressItems = dataGetAllAddress?.result?.items || [];

  const defaultAddress = addressItems.find(
    (address) => address.isDefault === true
  );

  useEffect(() => {
    if (defaultAddress) {
      setPhoneNumber(defaultAddress.phone || "");
      setAddressStreet(defaultAddress.streetDetail || "");
      setWard(defaultAddress.ward.name || "");
      setDistrict(defaultAddress.district.name || "");
      setProvince(defaultAddress.province.name || "");
    }
  }, [defaultAddress]);

  return (
    <Fragment>
      <Box display={"flex"} flexDirection="column" gap={2}>
        {/* Delivery Address */}
        <Box display={"flex"} justifyContent="space-between" mb={2}>
          <Typography
            variant="h4"
            fontWeight="bold"
            fontSize={{
              xl: "1.5rem",
              lg: "1.5rem",
              md: "1.3rem",
              sm: "1rem",
              xs: "1rem",
            }}
          >
            1. Địa chỉ giao hàng
          </Typography>

          <Button
            variant="contained"
            onClick={handleOpenModalAddressBook}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Book />
            <Typography
              variant="body1"
              fontSize={{ xs: "0.9rem", sm: "1rem", md: "1.1rem" }}
            >
              Chọn từ sổ địa chỉ
            </Typography>
          </Button>
        </Box>

        <Box>
          {isLoading ? (
            <Typography>Loading addresses...</Typography>
          ) : isError ? (
            <Typography color="error">
              Error loading addresses: {error.toString()}
            </Typography>
          ) : dataGetAllAddress && addressItems.length === 0 ? (
            <Box>
              <Card variant="outlined" sx={{ padding: "16px" }}></Card>
            </Box>
          ) : (
            defaultAddress && (
              <Box mb={2}>
                {/* Just display address if isDefault is true */}
                {defaultAddress && (
                  <>
                    <Box mb={2}>
                      <Typography variant="body1" mb={1}>
                        Email
                      </Typography>
                      <TextField
                        id="email"
                        fullWidth
                        disabled
                        value={defaultAddress.userName}
                      />
                    </Box>

                    <Box mb={2}>
                      <Typography variant="body1" mb={1}>
                        Số điện thoại
                      </Typography>
                      <TextField
                        fullWidth
                        id="phone-number"
                        name="phone-number"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                      />
                    </Box>

                    <Box mb={2}>
                      <Typography variant="body1" mb={1}>
                        Địa chỉ đường
                      </Typography>
                      <TextField
                        fullWidth
                        id="address-street"
                        name="address-street"
                        value={addressStreet}
                        onChange={handleAddressChange}
                      />
                    </Box>

                    {isMobile ? (
                      <Fragment>
                        <FormControl fullWidth sx={{ my: 2 }}>
                          <InputLabel id="select-ward-label">
                            Phường/xã
                          </InputLabel>
                          <Select
                            labelId="select-ward-label"
                            id="select-ward"
                            value={ward}
                            label="Chọn phường/xã"
                            onChange={handleWardChange}
                          >
                            <MenuItem value={defaultAddress?.ward.name}>
                              {defaultAddress?.ward.name}
                            </MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ my: 2 }}>
                          <InputLabel id="select-district-label">
                            Quận/huyện
                          </InputLabel>
                          <Select
                            labelId="select-district-label"
                            id="select-district"
                            value={district}
                            label="Chọn quận/huyện"
                            onChange={handleDistrictChange}
                          >
                            <MenuItem value={defaultAddress.district.name}>
                              {defaultAddress?.district.name}
                            </MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ my: 2 }}>
                          <InputLabel id="select-province-label">
                            Tỉnh/thành phố
                          </InputLabel>
                          <Select
                            labelId="select-province-label"
                            id="select-province"
                            value={province}
                            label="Chọn tỉnh/thành phố"
                            onChange={handleProvinceChange}
                          >
                            <MenuItem value={defaultAddress.province.name}>
                              {defaultAddress?.province.name}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Fragment>
                    ) : (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={2}
                        my={4}
                      >
                        <FormControl fullWidth>
                          <InputLabel id="select-ward-label">
                            Phường/xã
                          </InputLabel>
                          <Select
                            labelId="select-ward-label"
                            id="select-ward"
                            value={ward}
                            label="Chọn phường/xã"
                            onChange={handleWardChange}
                          >
                            <MenuItem value={defaultAddress?.ward.name}>
                              {defaultAddress?.ward.name}
                            </MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <InputLabel id="select-district-label">
                            Quận/huyện
                          </InputLabel>
                          <Select
                            labelId="select-district-label"
                            id="select-district"
                            value={district}
                            label="Chọn quận/huyện"
                            onChange={handleDistrictChange}
                          >
                            <MenuItem value={defaultAddress.district.name}>
                              {defaultAddress?.district.name}
                            </MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <InputLabel id="select-province-label">
                            Tỉnh/thành phố
                          </InputLabel>
                          <Select
                            labelId="select-province-label"
                            id="select-province"
                            value={province}
                            label="Chọn tỉnh/thành phố"
                            onChange={handleProvinceChange}
                          >
                            <MenuItem value={defaultAddress.province.name}>
                              {defaultAddress?.province.name}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            )
          )}
        </Box>

        {/* Payment Method */}
        <Typography variant="h6" fontWeight="bold">
          2. Hình thức thanh toán
        </Typography>
        <Card variant="outlined" sx={{ padding: "16px" }}>
          <FormControl>
            <RadioGroup
              name="payment-method"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              sx={{ mt: 1 }}
            >
              <Box display="flex" flexDirection={"column"}>
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  i
                  label="Thanh toán khi nhận hàng"
                />

                <img
                  src="/src/assets/images/order/cash-on-delivery.png"
                  alt="Cash-delivery"
                  style={{ width: 30, height: 30, marginLeft: 34 }}
                />
              </Box>

              <Box display="flex" flexDirection={"column"} mt={2}>
                <FormControlLabel
                  value="vnpay"
                  control={<Radio />}
                  label="Thanh toán thẻ VNPAY"
                />

                <img
                  src="/src/assets/images/order/vnpay-logo.jpg"
                  alt="VNPAY"
                  style={{ width: 30, height: 30, marginLeft: 34 }}
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Card>

        {/* Modal open address book */}
        <Dialog
          open={openModalAddressBook}
          onClose={handleCloseModalAddressBook}
          fullWidth
        >
          <DialogTitle
            variant="h4"
            fontWeight="bold"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            fontSize={{
              xl: "1.4rem",
              lg: "1.4rem",
              xs: "1.2rem",
            }}
          >
            Sổ địa chỉ
            <IconButton
              aria-label="close"
              onClick={handleCloseModalAddressBook}
            >
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent></DialogContent>

          <DialogActions>
            <Box mx={2} my={1}>
              <Button
                variant="contained"
                sx={{
                  fontSize: {
                    md: "0.9rem",
                    xs: "0.8rem",
                  },
                  px: 2,
                }}
                startIcon={<Add />}
              >
                Thêm địa chỉ
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </Fragment>
  );
};

export default ShippingInformation;
