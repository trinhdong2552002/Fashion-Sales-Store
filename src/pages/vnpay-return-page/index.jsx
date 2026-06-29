import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { Fragment, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useCreatePaymentCallbackByOrderMutation } from "@/services/api/order";

const VnPayReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // VNPAY standard query parameters or sanitized ones
  const orderId = searchParams.get("vnp_TxnRef") || searchParams.get("orderId");
  const responseCode =
    searchParams.get("vnp_ResponseCode") || searchParams.get("responseCode");

  const [createCallback, { isLoading, isSuccess, isError, error }] =
    useCreatePaymentCallbackByOrderMutation();
  const hasCalled = useRef(false);

  useEffect(() => {
    if (orderId && responseCode && !hasCalled.current) {
      hasCalled.current = true;
      createCallback({ orderId, responseCode });
    }
  }, [orderId, responseCode, createCallback]);

  if (!orderId || !responseCode) {
    return (
      <Container maxWidth="sm" sx={{ my: 8, textAlign: "center" }}>
        <Typography variant="h5" color="error" mb={3}>
          Thông tin thanh toán không hợp lệ
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Trở về trang chủ
        </Button>
      </Container>
    );
  }

  return (
    <Fragment>
      <Container maxWidth="sm" sx={{ my: 8, textAlign: "center" }}>
        {isLoading && (
          <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6">Đang xử lý thanh toán...</Typography>
          </Box>
        )}

        {isSuccess && (
          <Box display="flex" flexDirection="column" alignItems="center">
            <CheckCircleOutline
              sx={{ fontSize: 80, color: "success.main", mb: 2 }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color="success"
              gutterBottom
            >
              Thanh toán thành công!
            </Typography>
            <Typography variant="body1" color="#666" mb={4}>
              Cảm ơn bạn. Đơn hàng #{orderId} đã được thanh toán thành công.
            </Typography>
            <Box display="flex" gap={2}>
              <Button variant="outlined" component={Link} to="/all-products">
                Tiếp tục mua sắm
              </Button>
              <Button variant="contained" component={Link} to="/my-order">
                Xem đơn hàng của tôi
              </Button>
            </Box>
          </Box>
        )}

        {isError && (
          <Box display="flex" flexDirection="column" alignItems="center">
            <ErrorOutline sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
            <Typography
              variant="h5"
              fontWeight="bold"
              color="error"
              gutterBottom
            >
              Thanh toán thất bại hoặc đã bị huỷ!
            </Typography>
            <Typography variant="body1" color="#666" mb={4}>
              {error?.data?.message ||
                "Đã có lỗi xảy ra trong quá trình xác nhận thanh toán."}
            </Typography>
            <Box display="flex" gap={2}>
              <Button variant="outlined" component={Link} to="/">
                Về trang chủ
              </Button>
              <Button variant="contained" component={Link} to="/my-order">
                Xem lại đơn hàng
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Fragment>
  );
};

export default VnPayReturn;
