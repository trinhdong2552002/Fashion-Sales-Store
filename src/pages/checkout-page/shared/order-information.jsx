import { Box, Card, Typography, Divider, Button } from "@mui/material";
import { Fragment } from "react";
import { useLocation } from "react-router-dom";

const OrderInformation = () => {
  const location = useLocation();
  const orderInfo = location.state?.orderInfo;

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
            <Typography fontWeight="bold">Chưa tính</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="h6" fontWeight={"bold"}>
              Tổng cộng:
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {orderInfo
                ? (orderInfo.price * orderInfo.quantity).toLocaleString("vi-VN")
                : 0}
              đ
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={!orderInfo}
            // loading={isCreatingOrder}
            // loadingPosition="start"
            sx={{ mt: 2 }}
            // onClick={() => {}}
          >
            <Typography fontSize={"1.1rem"} fontWeight={"bold"}>
              Đặt hàng
            </Typography>
          </Button>
        </Card>
      </Box>
    </Fragment>
  );
};

export default OrderInformation;
