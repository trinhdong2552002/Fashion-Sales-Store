import {
  Close,
  Delete,
  LocalMall,
  RemoveShoppingCart,
  ShoppingCartOutlined,
  ArrowForward,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "@/components/snackbar";
import { useSelector } from "react-redux";
import { useGetAllFetchedPaginatedByCurrentUserQuery } from "@/services/api/cart";
import { useDeleteCartItemByIdMutation } from "@/services/api/cart-item";

const CartButton = () => {
  const navigate = useNavigate();
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
      showSnackbar("Xoá sản phẩm trong giỏ hàng thành công.", "success");
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
    return (
      <Box
        sx={{
          width: {
            xs: 320,
            sm: 380,
            md: 400,
          },
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header - Always visible */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          py={2}
          px={2}
        >
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <LocalMall />
            <Typography
              variant="h6"
              fontSize={{
                xs: "1.1rem",
                md: "1.25rem",
              }}
              fontWeight={"bold"}
            >
              Giỏ hàng của bạn
            </Typography>
            {cartItems.length > 0 && (
              <Typography
                variant="body2"
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                  px: 1,
                  py: 0.2,
                  borderRadius: 10,
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                {cartItems.length}
              </Typography>
            )}
          </Box>

          <IconButton onClick={toggleDrawer(false)} size="small">
            <Close />
          </IconButton>
        </Box>

        <Divider />

        {/* Body Content */}
        {isLoading ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              gap: 1.5,
            }}
          >
            <CircularProgress size={32} sx={{ color: "#000" }} />
            <Typography variant="body2" color="text.secondary">
              Đang tải giỏ hàng...
            </Typography>
          </Box>
        ) : isError ? (
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
            <Typography color="error" textAlign="center">
              Đã có lỗi xảy ra: {error?.data?.message || "Vui lòng thử lại."}
            </Typography>
          </Box>
        ) : cartItems.length === 0 ? (
          /* Empty State */
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                bgcolor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                color: "#888",
              }}
            >
              <RemoveShoppingCart sx={{ fontSize: 38 }} />
            </Box>

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Giỏ hàng của bạn đang trống
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 280, mb: 3, lineHeight: 1.5 }}
            >
              {!authenticated
                ? "Vui lòng đăng nhập để xem danh sách sản phẩm trong giỏ hàng."
                : "Hãy khám phá hàng ngàn mẫu thời trang mới nhất và chọn ngay sản phẩm yêu thích!"}
            </Typography>

            {!authenticated ? (
              <Button
                variant="contained"
                onClick={() => {
                  setOpenDrawer(false);
                  navigate("/login");
                }}
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                  px: 3.5,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#222" },
                }}
              >
                Đăng nhập ngay
              </Button>
            ) : (
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() => {
                  setOpenDrawer(false);
                  navigate("/all-products");
                }}
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                  px: 3.5,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#222" },
                }}
              >
                Khám phá sản phẩm
              </Button>
            )}
          </Box>
        ) : (
          /* Cart items present */
          <Fragment>
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
              }}
            >
              <Box spacing={2}>
                {cartItems?.map((cartItem, index) => (
                  <Box
                    key={index || cartItem.id}
                    display={"flex"}
                    spacing={2}
                    alignItems="center"
                    sx={{ borderBottom: "1px solid #eee", p: 2 }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid #e0e0e0",
                        flexShrink: 0,
                        marginRight: 2,
                        bgcolor: "#f5f5f5",
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

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        noWrap
                        title={cartItem.productVariantBasic?.product?.name}
                      >
                        {cartItem.productVariantBasic?.product?.name}
                      </Typography>
                      <Typography variant="body2" color="#666" my={0.5}>
                        {cartItem.productVariantBasic?.color?.name} | Size{" "}
                        {cartItem.productVariantBasic?.size?.name}
                      </Typography>
                      <Typography variant="body2" color="#666" mb={0.5}>
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
                      sx={{
                        color: "#888",
                        "&:hover": { color: "#d32f2f" },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider />

            {/* Footer button to view full cart details */}
            <Box sx={{ p: 2, bgcolor: "#fafafa" }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => {
                  setOpenDrawer(false);
                  navigate("/cart");
                }}
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                  py: 1.4,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  "&:hover": { bgcolor: "#222" },
                }}
              >
                Xem chi tiết giỏ hàng
              </Button>
            </Box>
          </Fragment>
        )}

        <Dialog
          open={openModalConfirm}
          onClose={handleCloseModalConfirm}
          aria-label="confirm-remove-dialog"
          PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
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
          <DialogActions sx={{ justifyContent: "center", pb: 1, gap: 1 }}>
            <Button variant="outlined" onClick={handleCloseModalConfirm}>
              Hủy
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#000", color: "#fff", "&:hover": { bgcolor: "#222" } }}
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
