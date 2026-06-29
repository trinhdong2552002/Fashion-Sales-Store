import { Fragment } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import dayjs from "dayjs";

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;
  console.log("orderData", orderData);

  const {
    id,
    orderDate,
    totalPrice,
    customerName,
    address,
    orderItems,
    discountAmount,
  } = orderData;

  if (!orderData) {
    return (
      <Container maxWidth="md" sx={{ my: 8, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={"bold"} mb={3}>
          Không tìm thấy thông tin đơn hàng!
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Trở về trang chủ
        </Button>
      </Container>
    );
  }

  return (
    <Fragment>
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <CheckCircleOutline
            sx={{ fontSize: 80, color: "success.main", mb: 2 }}
          />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Đặt hàng thành công!
          </Typography>
          <Typography variant="subtitle1" color="#666" textAlign="center">
            Cảm ơn {customerName} đã mua sắm tại cửa hàng của chúng tôi. <br />
            Đơn hàng của bạn đang được xử lý.
          </Typography>
        </Box>

        <Card variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6" fontWeight="bold">
              Mã đơn hàng: #{id}
            </Typography>
            <Typography variant="body1" color="#666">
              {dayjs(orderDate).format("DD/MM/YYYY HH:mm")}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="body1" fontWeight={"bold"} gutterBottom>
              Người nhận:{" "}
              <Typography variant="span" fontWeight={"normal"}>
                {customerName}
              </Typography>
            </Typography>
            <Typography variant="body1" fontWeight={"bold"} gutterBottom>
              Số điện thoại:{" "}
              <Typography variant="span" fontWeight={"normal"}>
                {address?.phone}
              </Typography>
            </Typography>
            <Typography variant="body1" fontWeight={"bold"} gutterBottom>
              Địa chỉ:{" "}
              <Typography variant="span" fontWeight={"normal"}>
                {address?.streetDetail}, {address?.ward?.name},{" "}
                {address?.district?.name}, {address?.province?.name}
              </Typography>
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" fontWeight={"bold"}>
                Giảm giá:{" "}
              </Typography>
              <Typography variant="body1" fontWeight={"bold"}>
                {discountAmount.toLocaleString("vi-VN")}đ
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold">
                Tổng cộng:
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {totalPrice.toLocaleString("vi-VN")}đ
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Sản phẩm đã đặt
          </Typography>

          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            {orderItems?.map((item) => (
              <Box key={item.id} display="flex" gap={2} alignItems="center">
                <img
                  src={
                    item.image?.imageUrl ||
                    item.productVariant?.product?.images?.[0]?.imageUrl
                  }
                  alt={item.productVariant?.product?.name}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <Box flex={1}>
                  <Typography variant="body1" fontWeight="bold">
                    {item.productVariant?.product?.name}
                  </Typography>
                  <Typography variant="body1" color="#666">
                    Phân loại: {item.productVariant?.color?.name},{" "}
                    {item.productVariant?.size?.name}
                  </Typography>
                  <Typography variant="body1" color="#666">
                    Số lượng: {item.quantity}
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight="bold">
                  {(item.unitPrice * item.quantity).toLocaleString("vi-VN")}đ
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>

        <Box display="flex" justifyContent="center" gap={2} mt={4}>
          <Button
            variant="outlined"
            component={Link}
            to="/all-products"
            size="large"
          >
            Tiếp tục mua sắm
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/my-order"
            size="large"
          >
            Xem đơn hàng của tôi
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
};

export default CheckoutSuccess;
