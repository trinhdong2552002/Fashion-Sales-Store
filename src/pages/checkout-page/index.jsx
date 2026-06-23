import { Container, Grid } from "@mui/material";
import { Fragment } from "react";
import ShippingInformation from "./shared/shipping-information";
import OrderInformation from "./shared/order-information";

const Checkout = () => {
  return (
    <Fragment>
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <ShippingInformation />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <OrderInformation />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Checkout;
