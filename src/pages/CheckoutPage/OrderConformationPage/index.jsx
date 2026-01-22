import { Box, Card } from "@mui/material";
import { Fragment } from "react";

const OrderInformation = () => {
  return (
    <Fragment>
      <Box display={"flex"} flexDirection="column" gap={2}>
        {/* Delivery address */}
        <Card variant="outlined" sx={{ padding: "16px" }}>
          Delivery Address Component
        </Card>
      </Box>
    </Fragment>
  );
};

export default OrderInformation;
