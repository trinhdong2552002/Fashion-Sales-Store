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
import { useState } from "react";

const ProductActions = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "right", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", p: "10px 20px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

ProductActions.propTypes = {
  products: PropTypes.object,
  loading: PropTypes.bool,
  selectedQuantity: PropTypes.number,
  selectedColor: PropTypes.string,
  selectedSize: PropTypes.string,
};

export default ProductActions;
