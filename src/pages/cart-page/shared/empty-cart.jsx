import { Box, Button, Typography, Paper } from "@mui/material";
import { RemoveShoppingCartOutlined, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const EmptyCart = ({ isGuest = false }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        py: { xs: 8, md: 10 },
        px: 3,
        textAlign: "center",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        my: 4,
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          bgcolor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          color: "#888",
        }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 48 }} />
      </Box>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {isGuest ? "Bạn chưa đăng nhập" : "Giỏ hàng của bạn đang trống"}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 450, mb: 4 }}
      >
        {isGuest
          ? "Vui lòng đăng nhập để xem danh sách sản phẩm trong giỏ hàng của bạn."
          : "Hãy khám phá hàng ngàn mẫu thời trang mới nhất và thêm sản phẩm yêu thích vào giỏ hàng ngay bây giờ!"}
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
        {isGuest ? (
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              bgcolor: "#000",
              color: "#fff",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": { bgcolor: "#222" },
            }}
          >
            Đăng nhập ngay
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate("/all-products")}
            sx={{
              bgcolor: "#000",
              color: "#fff",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": { bgcolor: "#222" },
            }}
          >
            Tiếp tục mua sắm
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default EmptyCart;
