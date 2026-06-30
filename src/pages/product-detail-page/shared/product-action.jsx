import { useSnackbar } from "@/components/snackbar";
import { useCreateCartItemMutation } from "@/services/api/cart-item";
import { AddShoppingCart } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const ProductAction = ({ variantId, quantity, disabled, buyNowData }) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const token = localStorage.getItem("accessToken");

  const [
    addToCartItem,
    {
      isLoading: isAddingToCart,
      isError: isErrorAddingToCart,
      error: errorAddingToCart,
    },
  ] = useCreateCartItemMutation();

  const handleAddToCart = async () => {
    if (!token) {
      navigate("/login");
      showSnackbar("Vui lòng đăng nhập để mua hàng!", "warning");
      return;
    }

    try {
      await addToCartItem({
        productVariantId: variantId,
        quantity: quantity,
      }).unwrap();
      showSnackbar("Thêm vào giỏ hàng thành công!", "success");
    } catch (error) {
      showSnackbar(
        error?.data?.message || "Thêm vào giỏ hàng thất bại!",
        "error",
      );
    }
  };

  const handleBuyNow = () => {
    if (!token) {
      navigate("/login");
      showSnackbar("Vui lòng đăng nhập để mua hàng!", "warning");
      return;
    }

    navigate("/checkout", { state: { orderInfo: buyNowData } });
  };

  if (isErrorAddingToCart) {
    showSnackbar(
      errorAddingToCart?.data?.message || "Thêm vào giỏ hàng thất bại!",
      "error",
    );
  }

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
          disabled={disabled}
          loading={isAddingToCart}
          loadingPosition="start"
          sx={{
            fontSize: "1rem",
            borderColor: "black",
            color: "black",
            bgcolor: "white",
            width: { xs: "100%", sm: "auto" },
          }}
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
        >
          Thêm giỏ hàng
        </Button>

        <Button
          variant="contained"
          disabled={disabled}
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={handleBuyNow}
        >
          Mua ngay
        </Button>
      </Box>
    </Fragment>
  );
};

export default ProductAction;
