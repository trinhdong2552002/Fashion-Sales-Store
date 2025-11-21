import { Container, Grid } from "@mui/material";
import { Fragment } from "react";
import ShippingInformation from "./ShippingInformation";
import OrderInformation from "./OrderConformation";


const Checkout = () => {
  return (
    <Fragment>
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            {/* Left side content shipping information */}
            <ShippingInformation />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            {/* Right side content order information */}
            <OrderInformation />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Checkout;
