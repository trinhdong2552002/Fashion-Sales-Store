import {
  Box,
  Card,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { Fragment } from "react";
import { useSnackbar } from "@/components/snackbar";
import { useCreateOrderMutation, useLazyGetPaymentByOrderQuery } from "@/services/api/order";
import { useNavigate } from "react-router-dom";

const OrderInformation = ({
  orderInfo,
  shippingFee,
  isCalculatingShipping,
  selectedAddressId,
  selectedPaymentMethod,
}) => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();
  const [getPaymentUrl, { isFetching: isGettingPaymentUrl }] = useLazyGetPaymentByOrderQuery();

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      showSnackbar("Vui lòng chọn địa chỉ giao hàng", "error");
      return;
    }
    if (!selectedPaymentMethod) {
      showSnackbar("Vui lòng chọn hình thức thanh toán", "error");
      return;
    }
    if (!orderInfo) {
      showSnackbar("Không có thông tin sản phẩm", "error");
      return;
    }

    try {
      const res = await createOrder({
        addressId: selectedAddressId,
        orderItems: [
          {
            productVariantId: orderInfo.productVariantId,
            quantity: orderInfo.quantity,
          },
        ],
        promotionId: null,
        shippingFee: shippingFee,
        paymentMethod: selectedPaymentMethod === "vnpay" ? "VNPAY" : "CASH",
      }).unwrap();
      
      if (selectedPaymentMethod === "vnpay") {
        const vnpayRes = await getPaymentUrl(res.result.id).unwrap();
        if (vnpayRes?.paymentUrl) {
          window.location.href = vnpayRes.paymentUrl;
          return;
        }
      }

      showSnackbar("Tạo đơn hàng thành công!", "success");
      navigate("/checkout-success", { state: { orderData: res.result } });
    } catch (error) {
      showSnackbar(
        error?.data?.message || "Có lỗi xảy ra khi tạo đơn hàng",
        "error",
      );
    }
  };

  if (isCreatingOrder) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        my={4}
      >
        <CircularProgress color="inherit" />
        <Typography>Đang xử lý đơn hàng...</Typography>
      </Box>
    );
  }

  return (
    <Fragment>
      <Box display={"flex"} flexDirection="column" gap={2}>
        <Card variant="outlined" sx={{ padding: "16px" }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Thông tin đơn hàng
          </Typography>

          {orderInfo ? (
            <Box display="flex" gap={2} mb={2}>
              <img
                src={orderInfo.productImage}
                alt={orderInfo.productName}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <Box>
                <Typography fontSize={"1.1rem"} fontWeight="bold" gutterBottom>
                  {orderInfo.productName}
                </Typography>
                <Typography
                  fontSize={"1rem"}
                  color="text.secondary"
                  gutterBottom
                >
                  Phân loại: {orderInfo.color}, {orderInfo.size}
                </Typography>
                <Typography
                  fontSize={"1rem"}
                  color="text.secondary"
                  gutterBottom
                >
                  Số lượng: {orderInfo.quantity}
                </Typography>
                <Typography fontSize={"1rem"} fontWeight="bold">
                  {orderInfo.price?.toLocaleString("vi-VN")}đ
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography color="error">
              Không có thông tin sản phẩm (Vui lòng chọn mua từ chi tiết sản
              phẩm)
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Tạm tính:</Typography>
            <Typography fontWeight="bold">
              {orderInfo
                ? (orderInfo.price * orderInfo.quantity).toLocaleString("vi-VN")
                : 0}
              đ
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography>Phí vận chuyển:</Typography>
            <Typography fontWeight="bold">
              {isCalculatingShipping
                ? "Đang tính phí vận chuyển..."
                : shippingFee > 0
                  ? `${shippingFee.toLocaleString("vi-VN")}đ`
                  : "Miễn phí"}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" my={3}>
            <Typography variant="h5" fontWeight="bold">
              Tổng cộng:
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {orderInfo
                ? (
                    orderInfo.price * orderInfo.quantity +
                    shippingFee
                  ).toLocaleString("vi-VN")
                : 0}
              đ
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={!orderInfo || isCreatingOrder || isCalculatingShipping || isGettingPaymentUrl}
            onClick={handlePlaceOrder}
          >
            <Typography fontSize={"1.1rem"} fontWeight={"bold"}>
              {isCreatingOrder || isGettingPaymentUrl ? "Đang xử lý..." : "Thanh toán"}
            </Typography>
          </Button>
        </Card>
      </Box>
    </Fragment>
  );
};

export default OrderInformation;
