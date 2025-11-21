import { useGetAllAddressByUserQuery } from "@/services/api/address";
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
import { ChildModalHideAddress } from "./ChildModalHideAddress";
import { ChildModalUpdateAddress } from "./ChildModalUpdateAddress";
import { ChildModalAddAddress } from "./ChileModalAddAddress";

const ShippingInformation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [addressInformation, setAddressInformation] = useState({
    phoneNumber: "",
    addressStreet: "",
    ward: "",
    district: "",
    province: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [openModalAddressBook, setOpenModalAddressBook] = useState(false);
  const [chooseAddressFromBook, setChooseAddressFromBook] = useState(null);

  const {
    data: dataGetAllAddress,
    isLoading,
    isError,
    error,
    refetch: refetchGetAllAddress,
  } = useGetAllAddressByUserQuery({
    pageNo: 1,
    pageSize: 100,
  });

  useEffect(() => {
    refetchGetAllAddress();
  }, []);

  const handleAddressInformationChange = (field, value) => {
    setAddressInformation((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  //
  const handleChooseAddress = (address) => {
    setChooseAddressFromBook(address);

    setAddressInformation({
      phoneNumber: address.phone || "",
      addressStreet: address.streetDetail || "",
      ward: address.ward.name || "",
      district: address.district.name || "",
      province: address.province.name || "",
    });
    setOpenModalAddressBook(false);
  };

  const addressItems = dataGetAllAddress?.result?.items || [];

  const defaultAddress = addressItems.find(
    (address) => address.isDefault === true || address.isDefault === false
  );

  useEffect(() => {
    if (defaultAddress) {
      setAddressInformation({
        phoneNumber: defaultAddress.phone || "",
        addressStreet: defaultAddress.streetDetail || "",
        ward: defaultAddress.ward.name || "",
        district: defaultAddress.district.name || "",
        province: defaultAddress.province.name || "",
      });
    }
  }, [defaultAddress]);

  return (
    <Fragment>
      <Box display={"flex"} flexDirection="column" gap={2}>
        {/* Delivery Address */}
        <Box
          display={"flex"}
          flexDirection={{
            xs: "column",
            md: "row",
          }}
          alignItems={{
            xs: "flex-start",
            md: "center",
          }}
          justifyContent="space-between"
          mb={2}
        >
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
            sx={{
              mt: {
                xs: 2,
                md: 0,
              },
            }}
          >
            <Book
              sx={{
                fontSize: { md: "1.2rem", sm: "1.1rem", xs: "1rem" },
              }}
            />
            <Typography
              variant="body1"
              fontSize={{ xs: "0.8rem", sm: "0.9rem", md: "1rem" }}
              ml={1}
            >
              Chọn từ sổ địa chỉ
            </Typography>
          </Button>
        </Box>

        <Box>
          {isLoading ? (
            <Typography>Đang tải địa chỉ...</Typography>
          ) : isError ? (
            <Typography color="error">
              Lỗi địa chỉ: {error.toString()}
            </Typography>
          ) : dataGetAllAddress && addressItems.length === 0 ? (
            <Box>
              <Typography>Chưa có địa chỉ nào.</Typography>
            </Box>
          ) : (
            defaultAddress && (
              <Box mb={2}>
                {/* Just display address if isDefault is true */}

                <>
                  <Box mb={2}>
                    <Typography
                      variant="body1"
                      mb={1}
                      fontSize={{
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.2rem",
                      }}
                    >
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
                    <Typography
                      variant="body1"
                      mb={1}
                      fontSize={{
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.2rem",
                      }}
                    >
                      Số điện thoại
                    </Typography>
                    <TextField
                      fullWidth
                      id="phone-number"
                      name="phone-number"
                      value={addressInformation.phoneNumber}
                      onChange={(e) =>
                        handleAddressInformationChange(
                          "phoneNumber",
                          e.target.value
                        )
                      }
                    />
                  </Box>

                  <Box mb={2}>
                    <Typography
                      variant="body1"
                      mb={1}
                      fontSize={{
                        xs: "0.9rem",
                        sm: "1rem",
                        md: "1.2rem",
                      }}
                    >
                      Địa chỉ đường
                    </Typography>
                    <TextField
                      fullWidth
                      id="address-street"
                      name="address-street"
                      value={addressInformation.addressStreet}
                      onChange={(e) =>
                        handleAddressInformationChange(
                          "addressStreet",
                          e.target.value
                        )
                      }
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
                          value={addressInformation.ward}
                          label="Chọn phường/xã"
                          onChange={(e) =>
                            handleAddressInformationChange(
                              "ward",
                              e.target.value
                            )
                          }
                        >
                          {/* Get each state to match after selected ward */}
                          <MenuItem value={addressInformation.ward || ""}>
                            {addressInformation.ward || ""}
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
                          value={addressInformation.district}
                          label="Chọn quận/huyện"
                          onChange={(e) =>
                            handleAddressInformationChange(
                              "district",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value={addressInformation.district || ""}>
                            {addressInformation.district || ""}
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
                          value={addressInformation.province}
                          label="Chọn tỉnh/thành phố"
                          onChange={(e) =>
                            handleAddressInformationChange(
                              "province",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value={addressInformation.province || ""}>
                            {addressInformation.province || ""}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Fragment>
                  ) : (
                    <Box display={"flex"} alignItems={"center"} gap={2} my={4}>
                      <FormControl fullWidth>
                        <InputLabel id="select-ward-label">
                          Phường/xã
                        </InputLabel>
                        <Select
                          labelId="select-ward-label"
                          id="select-ward"
                          value={addressInformation.ward}
                          label="Chọn phường/xã"
                          onChange={(e) =>
                            handleAddressInformationChange(
                              "ward",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value={addressInformation.ward || ""}>
                            {addressInformation.ward || ""}
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
                          value={addressInformation.district}
                          label="Chọn quận/huyện"
                          onChange={(e) =>
                            handleAddressInformationChange(
                              "district",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value={addressInformation.district || ""}>
                            {addressInformation.district || ""}
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
                          value={addressInformation.province}
                          label="Chọn tỉnh/thành phố"
                          onChange={(e) =>
                            handleAddressInformationChange(
                              "province",
                              e.target.value
                            )
                          }
                        >
                          <MenuItem value={addressInformation.province || ""}>
                            {addressInformation.province || ""}
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  )}
                </>
              </Box>
            )
          )}
        </Box>

        {/* Payment Method */}
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
                  label="Thanh toán khi nhận hàng"
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                      md: "1.2rem",
                    },
                  }}
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
          fullWidth
          open={openModalAddressBook}
          onClose={handleCloseModalAddressBook}
        >
          <DialogTitle
            variant="h4"
            fontWeight="bold"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            fontSize={{
              xl: "1.6rem",
              lg: "1.6rem",
              md: "1.4rem",
              sm: "1.2rem",
              xs: "1.1rem",
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

          <DialogContent>
            {addressItems.length === 0 ? (
              <Typography>Chưa có địa chỉ nào trong danh sách.</Typography>
            ) : (
              addressItems.map((address) => (
                <Box
                  key={address.id}
                  mb={2}
                  p={2}
                  border={"1px solid #ccc"}
                  borderRadius="8px"
                  onClick={() => handleChooseAddress(address)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      chooseAddressFromBook &&
                      chooseAddressFromBook.id === address.id
                        ? "#f0f0f0"
                        : "transparent",
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight={address.isDefault ? "bold" : "normal"}
                  >
                    {address.phone}
                  </Typography>
                  <Typography variant="body2">
                    {address.streetDetail}, {address.ward.name},{" "}
                    {address.district.name}, {address.province.name}
                  </Typography>
                  {address.isDefault && (
                    <Typography variant="body2" fontWeight="bold">
                      Địa chỉ mặc định
                    </Typography>
                  )}

                  <Box display="flex" justifyContent="flex-end" gap={2}>
                    <ChildModalUpdateAddress
                      address={address}
                      refetchGetAllAddress={refetchGetAllAddress}
                    />
                    <ChildModalHideAddress
                      addressId={address.id}
                      refetchGetAllAddress={refetchGetAllAddress}
                    />
                  </Box>
                </Box>
              ))
            )}
          </DialogContent>

          <DialogActions>
            <Box mx={2} my={1}>
              <ChildModalAddAddress
                refetchGetAllAddress={refetchGetAllAddress}
              />
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </Fragment>
  );
};

export default ShippingInformation;
