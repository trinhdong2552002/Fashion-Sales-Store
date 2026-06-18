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
import { useSelector } from "react-redux";
import { useGetAllFetchedPaginatedByCurrentUserQuery } from "@/services/api/cart";
import { useDeleteCartItemByIdMutation } from "@/services/api/cart_item";

const CartButton = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { authenticated } = useSelector((state) => state.auth);

  const {
    data: dataCartByUser,
    isLoading,
    isError,
    error,
  } = useGetAllFetchedPaginatedByCurrentUserQuery(
    {
      page: 0,
      size: 10,
    },
    { skip: !authenticated },
  );

  const [deleteCartItemById] = useDeleteCartItemByIdMutation();

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
      await deleteCartItemById(id).unwrap();
      handleCloseModalConfirm();
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

  const calculateItemCount =
    authenticated && dataCartByUser?.result
      ? dataCartByUser.result.totalItems || 0
      : 0;

  const renderCartContent = () => {
    if (isLoading) {
      return (
        <Typography sx={{ p: 3, textAlign: "center", color: "#666" }}>
          Đang tải giỏ hàng...
        </Typography>
      );
    }

    if (isError) {
      return (
        <Typography sx={{ p: 3, textAlign: "center", color: "red" }}>
          Đã có lỗi xảy ra: {error?.data?.message || "Vui lòng thử lại."}
        </Typography>
      );
    }

    if (cartItems.length === 0) {
      return (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 3,
          }}
        >
          <RemoveShoppingCart sx={{ fontSize: 60, color: "#ccc" }} />
          <Typography
            textAlign={"center"}
            mt={1}
            variant="h6"
            color="#666"
            fontSize={{ xs: "1rem", sm: "1rem", md: "1.2rem" }}
          >
            Giỏ hàng của bạn đang trống.
          </Typography>
        </Box>
      );
    }

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
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              maxHeight: "calc(100vh - 150px)",
            }}
          >
            <Box spacing={2}>
              {cartItems?.map((cartItem, index) => (
                <Box
                  key={index || cartItem.id}
                  display={"flex"}
                  spacing={2}
                  alignItems="center"
                  sx={{ borderBottom: "1px solid #ddd", p: 2 }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "5px",
                      overflow: "hidden",
                      border: "1px solid #e0e0e0",
                      flexShrink: 0,
                      marginRight: 2,
                    }}
                  >
                    <img
                      src={
                        cartItem.image?.imageUrl ||
                        "https://via.placeholder.com/70"
                      }
                      alt={
                        cartItem.productVariantBasic?.product?.name || "product"
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {cartItem.productVariantBasic?.product?.name}
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
        <Badge
          badgeContent={calculateItemCount}
          overlap="circular"
          invisible={calculateItemCount === 0}
          sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: "black",
              fontSize: "0.9rem",
              borderRadius: "100%",
              top: "-8px",
            },
          }}
        />
      </IconButton>

      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        {renderCartContent()}
      </Drawer>
    </Fragment>
  );
};

export default CartButton;
