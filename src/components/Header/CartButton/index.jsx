import {
  Close,
  LocalMall,
  SentimentDissatisfied,
  SentimentDissatisfiedOutlined,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import LocalMallIcon from "@mui/icons-material/LocalMall";
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartByUserQuery } from "@/services/api/cart";
// import { selectUserId } from "@/store/redux/user/reducer";
import { removeFromCart } from "@/store/redux/cart/reducer";

const CartButton = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const dispatch = useDispatch();
  // const userId = useSelector(selectUserId);
  // const { data: cartData, isLoading } = useGetCartByUserQuery(userId, {
  //   skip: !userId,
  // });
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
          width: 400,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        {/* Header */}
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={4}
          mb={1}
          mx={1}
        >
          <Box display={"flex"} alignItems={"center"}>
            <LocalMall />
            <Typography variant="h5" fontWeight={"bold"} ml={2}>
              Giỏ hàng của bạn
            </Typography>
          </Box>

          <IconButton onClick={toggleDrawer(false)}>
            <Close />
          </IconButton>
        </Box>

        <Divider />

        {/* Danh sách sản phẩm với thanh cuộn */}
        {/* {isLoading ? (
          <Typography sx={{ p: 2, textAlign: "center" }}>
            Đang tải giỏ hàng...
          </Typography>
        ) : !userId ? ( */}
        {/* <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <Typography variant="h6">VUI LÒNG ĐĂNG NHẬP!</Typography>
            <SentimentDissatisfiedIcon fontSize="large" />
          </Box>
        ) : cartItems.length === 0 ? ( */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h6">Chưa có sản phẩm nào!</Typography>
          <SentimentDissatisfiedOutlined fontSize="large" />
        </Box>
        {/* ) : ( */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
            p: 2,
          }}
        >
          <Stack spacing={2}>
            {cartItems.map((item, index) => (
              <Stack
                key={index}
                direction="row"
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
              </Stack>
            ))}
          </Stack>
        </Box>
        {/* )} */}

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
    <>
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
    </>
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
