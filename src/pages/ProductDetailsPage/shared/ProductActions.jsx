import { useSnackbar } from "@/components/Snackbar";
import { useCreateCartItemMutation } from "@/services/api/cart_item";
import { AddShoppingCart } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const ProductActions = ({ variantId, quantity }) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [addToCartItem, { isLoading: isAddingToCart }] =
    useCreateCartItemMutation();

  const handleAddToCart = async () => {
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
          disabled={isAddingToCart}
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
