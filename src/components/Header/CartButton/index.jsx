import {
  Close,
  LocalMall,
  SentimentDissatisfiedOutlined,
} from "@mui/icons-material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Badge,
  badgeClasses,
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartByUserQuery } from "@/services/api/cart";

import { removeFromCart } from "@/store/redux/cart/reducer";
import { selectUser } from "@/store/redux/user/reducer";

const CartButton = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const dispatch = useDispatch();
  const checkUser = useSelector(selectUser);
  const { isLoading } = useGetCartByUserQuery(checkUser, {
    skip: !checkUser,
  });
  // console.log("Cart data from API:", cartData);

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const totalItems = useSelector((state) => state.cart?.cartTotalQuantity || 0);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleOpenDialog = (item) => {
    setItemToRemove(item);
    setOpenDialog(true);
  };

  // Đóng Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setItemToRemove(null);
  };

  // Xác nhận xóa sản phẩm
  const handleConfirmRemove = () => {
    if (itemToRemove) {
      dispatch(
        removeFromCart({
          productId: itemToRemove.productId,
          color: itemToRemove.color,
          size: itemToRemove.size,
        })
      );
    }
    handleCloseDialog();
  };

  const DrawerList = () => {
    return (
      <Box
        sx={{
          width: {
            xs: 300,
            sm: 400,
            md: 400,
          },
          height: "100%",
          p: 2,
        }}
      >
        {/* Header */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
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

        {/* Danh sách sản phẩm với thanh cuộn */}
        {isLoading ? (
          <Typography sx={{ p: 2, textAlign: "center" }}>
            Đang tải giỏ hàng...
          </Typography>
        ) : !checkUser ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <Typography variant="h6">Vui lòng đăng nhập!</Typography>
            <SentimentDissatisfiedIcon fontSize="large" />
          </Box>
        ) : cartItems.length === 0 ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            mt={4}
            gap={1}
          >
            <SentimentDissatisfiedOutlined fontSize="large" />
            <Typography
              variant="h6"
              fontSize={{
                xs: "0.9rem",
                sm: "1rem",
                md: "1.2rem",
              }}
              textAlign={"center"}
            >
              Chưa có sản phẩm nào trong giỏ hàng.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              maxHeight: "calc(100vh - 200px)",
              p: 2,
            }}
          >
            <Box spacing={2}>
              {cartItems.map((item, index) => (
                <Box
                  key={index}
                  display={"flex"}
                  spacing={2}
                  alignItems="center"
                  sx={{ borderBottom: "1px solid #ddd", pb: 1 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                  />
                  <Stack spacing={1} sx={{ flex: 1 }}>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body2">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}
                    </Typography>
                  </Stack>

                  <IconButton
                    onClick={() => handleOpenDialog(item)}
                    sx={{ color: "black" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {cartItems.length > 0 && (
          <Box sx={{ flexShrink: 0, p: 2 }}>
            <Button
              variant="contained"
              sx={{ width: "100%", backgroundColor: "black", color: "white" }}
              onClick={() => {
                toggleDrawer(false)();
              }}
            >
              Xem giỏ hàng
            </Button>
          </Box>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
          <DialogContent>
            <Typography>
              Bạn có chắc chắn muốn xóa sản phẩm{" "}
              <strong>{itemToRemove?.name}</strong> khỏi giỏ hàng?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Hủy
            </Button>
            <Button onClick={handleConfirmRemove} color="error" autoFocus>
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
        <ShoppingCartOutlinedIcon />
        <CartBadge
          badgeContent={totalItems}
          color="primary"
          overlap="circular"
        />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList()}
      </Drawer>
    </Fragment>
  );
};

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
    background-color: black;
    color: white;
  }
`;

export default CartButton;
