import {
  Alert,
  alpha,
  Box,
  Button,
  Skeleton,
  Snackbar,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";

// import { selectUserId } from "@/store/redux/user/reducer";
import { Fragment, useState } from "react";

const ProductActions = () => {
  return (
    <Fragment>
      <Box display={"flex"} alignItems={"center"} sx={{ m: "30px 0" }}>
        <Button
          variant="outlined"
          sx={{
            fontSize: "1rem",
            borderColor: "black",
            color: "black",
            bgcolor: "white",
          }}
          // onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </Button>

        <Button
          variant="contained"
          sx={{
            fontSize: "1rem",
            ml: 4,
            backgroundColor: "black",
            color: "white",
          }}
          // onClick={handleBuyNow}
        >
          Mua ngay
        </Button>
      </Box>
    </Fragment>
  );
};

export default ProductActions;
