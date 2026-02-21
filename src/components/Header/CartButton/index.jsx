import {
  Close,
  Delete,
  LocalMall,
  RemoveShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useSnackbar } from "@/components/Snackbar";
import {
  useDeleteCartItemMutation,
  useGetCartByUserQuery,
} from "@/services/api/cart";

const CartButton = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { showSnackbar } = useSnackbar();
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    data: dataCartByUser,
    isLoading,
    isError,
    error,
    refetch: refetchCartByUser,
  } = useGetCartByUserQuery({
    pageNo: 1,
    pageSize: 10,
  });
  const [deleteCartItem] = useDeleteCartItemMutation();

  useEffect(() => {
    refetchCartByUser();
  }, [refetchCartByUser]);

  const cartItems = dataCartByUser?.result?.items || [];

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleOpenModalConfirm = (id) => {
    setSelectedItem(id);
    setOpenModalConfirm(true);
  };

  const handleCloseModalConfirm = () => {
    setOpenModalConfirm(false);
    setSelectedItem(null);
  };

  const handleDeleteCartItem = async (id) => {
    try {
      await deleteCartItem(id).unwrap();
      handleCloseModalConfirm();
      refetchCartByUser();
      showSnackbar(" Xoá sản phẩm trong giỏ hàng thành công.", "success");
    } catch (error) {
      if (error?.data?.message) {
        showSnackbar(
          "Xoá sản phẩm trong giỏ hàng thất bại. Vui lòng thử lại sau.",
          "error",
        );
      }
    }
  };

  const CartDrawer = () => {
    return (
      <Box
        sx={{
          width: {
            xs: 300,
            sm: 400,
            md: 400,
          },
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          py={2}
          px={1}
        >
          <Box display={"flex"} alignItems={"center"}>
            <LocalMall />
            <Typography
              variant="h5"
              fontSize={{
                xs: "1.2rem",
                md: "1.3rem",
              }}
              fontWeight={"bold"}
              ml={2}
            >
              Giỏ hàng của bạn
            </Typography>
          </Box>

          <IconButton onClick={toggleDrawer(false)}>
            <Close />
          </IconButton>
        </Box>

        <Divider />

        {/* Main content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {isLoading ? (
            <>
              <Typography sx={{ p: 2, textAlign: "center" }}>
                Đang tải giỏ hàng...
              </Typography>
            </>
          ) : isError ? (
            <>
              <Typography sx={{ p: 2, textAlign: "center", color: "red" }}>
                Đã có lỗi xảy ra: {error?.data?.message || "Vui lòng thử lại."}
              </Typography>
            </>
          ) : cartItems.length === 0 ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RemoveShoppingCart sx={{ fontSize: 60, color: "#ccc" }} />
              <Typography
                textAlign={"center"}
                mt={1}
                variant="h6"
                color="#666"
                fontSize={{
                  xs: "1rem",
                  sm: "1rem",
                  md: "1.2rem",
                }}
              >
                Giỏ hàng của bạn đang trống.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                maxHeight: "calc(100vh - 150px)",
              }}
            >
              <Box spacing={2}>
                {cartItems?.map((cartItem, id) => (
                  <Box
                    key={id}
                    display={"flex"}
                    spacing={2}
                    alignItems="center"
                    sx={{ borderBottom: "1px solid #ddd", p: 2 }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {cartItem.productVariantBasic.product.name}
                      </Typography>
                      <Typography variant="subtitle2" color="#666" my={1}>
                        {cartItem.productVariantBasic.color.name} | Size{" "}
                        {cartItem.productVariantBasic.size.name}
                      </Typography>
                      <Typography variant="subtitle2" color="#666" mb={1}>
                        Số lượng: {cartItem.quantity}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(cartItem.price)}
                      </Typography>
                    </Box>

                    <IconButton
                      onClick={() => handleOpenModalConfirm(cartItem)}
                      sx={{ color: "black" }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Button for footer cart items if cart item than bigger 0 will appear button else will hide it */}
        <Box sx={{ m: 2 }}>
          <Button
            variant="contained"
            sx={{
              display: cartItems.length > 0 ? "block" : "none",
              width: "100%",
            }}
            onClick={() => toggleDrawer(false)()}
          >
            Xem chi tiết giỏ hàng
          </Button>
        </Box>

        <Dialog
          open={openModalConfirm}
          onClose={handleCloseModalConfirm}
          aria-label="confirm-remove-dialog"
        >
          <DialogContent>
            <Typography
              align="center"
              fontWeight={"bold"}
              fontSize={{ xs: "1.1rem", md: "1.2rem" }}
            >
              Xác nhận xoá sản phẩm khỏi giỏ hàng?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseModalConfirm}>
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDeleteCartItem(selectedItem.id)}
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  return (
    <Fragment>
      <IconButton aria-label="shopping-cart" onClick={toggleDrawer(true)}>
        <ShoppingCartOutlined />
        <Badge color="primary" overlap="circular" />
      </IconButton>

      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {CartDrawer()}
      </Drawer>
    </Fragment>
  );
};

export default CartButton;
