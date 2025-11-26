import { Box, Typography, Paper } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useGetAllAddressByUserQuery } from "@/services/api/address";
import { AddAddressModal } from "@/components/Address/AddAddressModal";
import { UpdateAddressModal } from "@/components/Address/UpdateAddressModal";
import { HideAddressModal } from "@/components/Address/HideAddressModal";

const AddressInformation = () => {
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

  useEffect(() => {
    refetchGetAllAddress();
  }, []);

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

        <AddAddressModal refetchGetAllAddress={refetchGetAllAddress} />
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
      ) : isLoadingGetAllAddress ? (
        <Typography
          variant="body1"
          fontSize={{ xs: "0.9rem", sm: "1rem", md: "1rem" }}
          color="#666"
          textAlign={"center"}
        >
          Đang tải địa chỉ...
        </Typography>
      ) : isErrorGetAllAddress ? (
        <Typography
          variant="body1"
          fontSize={{ xs: "0.9rem", sm: "1rem", md: "1rem" }}
          color="error"
          textAlign={"center"}
        >
          Lỗi tải địa chỉ: {errorGetAllAddress?.data?.message}
        </Typography>
      ) : (
        dataGetAllAddress?.result?.items.map((address) => (
          <Paper
            key={address.id}
            elevation={2}
            sx={{
              p: 3,
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
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <UpdateAddressModal
                address={address}
                refetchGetAllAddress={refetchGetAllAddress}
              />
              <HideAddressModal
                addressId={address.id}
                refetchGetAllAddress={refetchGetAllAddress}
              />
            </Box>
          </Paper>
        ))
      )}
    </Fragment>
  );
};

export default AddressInformation;
