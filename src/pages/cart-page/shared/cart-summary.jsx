import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import {
  LocalShippingOutlined,
  AssignmentReturnOutlined,
  PaymentOutlined,
  ArrowForward,
  DiscountOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useSnackbar } from "@/components/snackbar";

const CartSummary = ({ selectedCount, subtotal, onCheckout, disabled }) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const { showSnackbar } = useSnackbar();

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      showSnackbar("Vui lòng nhập mã khuyến mãi", "warning");
      return;
    }

    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      const upperCode = couponCode.trim().toUpperCase();
      if (upperCode === "FASHION10" || upperCode === "SALE10") {
        const discount = Math.round(subtotal * 0.1);
        setAppliedCoupon({ code: upperCode, discount });
        showSnackbar(`Áp dụng mã ${upperCode} giảm 10% thành công!`, "success");
      } else if (upperCode === "FREESHIP") {
        setAppliedCoupon({ code: upperCode, discount: 30000 });
        showSnackbar(
          "Áp dụng mã FREESHIP giảm 30.000đ phí vận chuyển!",
          "success",
        );
      } else {
        showSnackbar("Mã khuyến mãi không hợp lệ hoặc đã hết hạn", "error");
      }
    }, 400);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    showSnackbar("Đã gỡ mã khuyến mãi", "info");
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Card
        variant="outlined"
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: 3,
          borderColor: "#e0e0e0",
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          bgcolor: "#fff",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Tóm tắt đơn hàng
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Promo code input */}
        <Box mb={2.5}>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Mã giảm giá / Voucher
          </Typography>
          {appliedCoupon ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={1.5}
              borderRadius={2}
              bgcolor="#fafafa"
              border="1px dashed #d9d9d9"
            >
              <Box display="flex" alignItems="center" gap={1}>
                <DiscountOutlined sx={{ color: "#52c41a", fontSize: 20 }} />
                <Typography variant="body2" fontWeight="bold">
                  {appliedCoupon.code}
                </Typography>
                <Chip
                  size="small"
                  label={`-${appliedCoupon.discount.toLocaleString("vi-VN")}đ`}
                  color="success"
                  sx={{ height: 22, fontSize: "0.75rem" }}
                />
              </Box>
              <Button
                size="small"
                color="error"
                onClick={handleRemoveCoupon}
                sx={{ textTransform: "none", minWidth: "auto", p: 0.5 }}
              >
                Gỡ
              </Button>
            </Box>
          ) : (
            <Box display="flex" gap={1}>
              <TextField
                size="small"
                fullWidth
                placeholder="Nhập mã giảm giá..."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <Button
                variant="outlined"
                onClick={handleApplyCoupon}
                disabled={isApplying || !couponCode.trim()}
                sx={{
                  borderColor: "#000",
                  color: "#000",
                  textTransform: "none",
                  fontWeight: "600",
                  borderRadius: 2,
                  px: 2.5,
                  whiteSpace: "nowrap",
                  "&:hover": {
                    borderColor: "#000",
                    bgcolor: "#f5f5f5",
                  },
                }}
              >
                {isApplying ? "Đang áp dụng..." : "Áp dụng"}
              </Button>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Price Breakdowns */}
        <Box display="flex" flexDirection="column" gap={1.5} mb={2.5}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="text.secondary">
              Đã chọn:
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {selectedCount} sản phẩm
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="text.secondary">
              Tạm tính:
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {subtotal.toLocaleString("vi-VN")}đ
            </Typography>
          </Box>

          {appliedCoupon && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                Giảm giá voucher:
              </Typography>
              <Typography variant="body2" fontWeight="600" color="error.main">
                -{discountAmount.toLocaleString("vi-VN")}đ
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Grand Total */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          mb={3}
        >
          <Typography variant="h6" fontWeight="bold">
            Tổng cộng:
          </Typography>
          <Box textAlign="right">
            <Typography
              variant="h5"
              fontWeight="800"
              color="#000"
              sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem" } }}
            >
              {grandTotal.toLocaleString("vi-VN")}đ
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              (Đã bao gồm VAT nếu có)
            </Typography>
          </Box>
        </Box>

        {/* Checkout Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={disabled || selectedCount === 0}
          endIcon={<ArrowForward />}
          onClick={onCheckout}
          sx={{
            py: 1.8,
            borderRadius: 2.5,
            bgcolor: "#000",
            color: "#fff",
            textTransform: "none",
            fontSize: "1.05rem",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            "&:hover": {
              bgcolor: "#222",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            },
            "&.Mui-disabled": {
              bgcolor: "#e0e0e0",
              color: "#9e9e9e",
            },
          }}
        >
          {selectedCount === 0
            ? "Vui lòng chọn sản phẩm"
            : `Tiến hành đặt hàng (${selectedCount})`}
        </Button>
      </Card>

      {/* Trust & Guarantee Box */}
      <Card
        variant="outlined"
        sx={{
          p: 2.5,
          borderRadius: 3,
          borderColor: "#eee",
          bgcolor: "#fafafa",
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold" mb={1.5}>
          Chính sách mua hàng tại Fashion Store
        </Typography>

        <Box display="flex" flexDirection="column" gap={1.5}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <LocalShippingOutlined sx={{ fontSize: 20, color: "#666" }} />
            <Typography variant="body2" color="text.secondary">
              Miễn phí giao hàng đơn từ 500.000đ
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1.5}>
            <AssignmentReturnOutlined sx={{ fontSize: 20, color: "#666" }} />
            <Typography variant="body2" color="text.secondary">
              Đổi trả miễn phí trong vòng 7 ngày
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1.5}>
            <PaymentOutlined sx={{ fontSize: 20, color: "#666" }} />
            <Typography variant="body2" color="text.secondary">
              Thanh toán tiện lợi qua VNPAY hoặc COD
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default CartSummary;
