import { AddShoppingCart } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const ProductActions = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Box
        display={"flex"}
        flexDirection={{
          xs: "column",
          sm: "row",
        }}
        gap={2}
        justifyContent={{
          xs: "center",
          sm: "flex-start",
        }}
        alignItems={"center"}
        my={3}
      >
        <Button
          variant="outlined"
          sx={{
            fontSize: "1rem",
            borderColor: "black",
            color: "black",
            bgcolor: "white",

            width: { xs: "100%", sm: "auto" },
          }}
          startIcon={<AddShoppingCart />}
        >
          Thêm giỏ hàng
        </Button>

        <Button
          variant="contained"
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={() => navigate("/checkout")}
        >
          Mua ngay
        </Button>
      </Box>
    </Fragment>
  );
};

export default ProductActions;
