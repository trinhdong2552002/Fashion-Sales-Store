import { Box, Container, Grid, Typography } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShippingInformation from "./shared/shipping-information";
import OrderInformation from "./shared/order-information";
import { useCalculateShippingFeeMutation } from "@/services/api/order";

const Checkout = () => {
  const location = useLocation();
  const orderInfo = location.state?.orderInfo;

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const [
    calculateShippingFee,
    {
      data: dataShippingFee,
      isError: isErrorCalculateShippingFee,
      error: errorCalculateShippingFee,
    },
  ] = useCalculateShippingFeeMutation();

  const shippingFee = dataShippingFee?.result?.total || 0;

  useEffect(() => {
    if (selectedAddressId && orderInfo) {
      calculateShippingFee({
        addressId: selectedAddressId,
        orderItems: [
          {
            productVariantId: orderInfo.productVariantId,
            quantity: orderInfo.quantity,
          },
        ],
      });
    }
  }, [selectedAddressId, orderInfo, calculateShippingFee]);

  if (isErrorCalculateShippingFee) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography mt={2}>
            {errorCalculateShippingFee?.data?.message ||
              "Lỗi khi tính phí vận chuyển"}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Fragment>
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <ShippingInformation
              onAddressSelected={(addressId) => setSelectedAddressId(addressId)}
              onPaymentMethodChange={(method) =>
                setSelectedPaymentMethod(method)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <OrderInformation
              orderInfo={orderInfo}
              shippingFee={shippingFee}
              selectedAddressId={selectedAddressId}
              selectedPaymentMethod={selectedPaymentMethod}
            />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Checkout;
