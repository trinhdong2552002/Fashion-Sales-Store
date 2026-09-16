import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { Fragment, useState } from "react";
import dayjs from "dayjs";
import {
  useGetOrdersByCurrentUserQuery,
  useCancelOrderMutation,
} from "@/services/api/order";
import { useSnackbar } from "@/components/snackbar";
import WallpaperRepresentative from "@/components/wallpaper-representative";
import OrderDetailDialog from "./shared/order-detail-dialog";
import CancelConfirmDialog from "./shared/cancel-confim-order";
import { useNavigate } from "react-router-dom";
import LoadingItem from "@/components/loading-item/loading-item";
import ErrorItem from "@/components/error-item/error-item";
import CustomTabs from "@/components/tabs";
import { ORDER_STATUS_TABS, STATUS_CONFIG } from "@/constants";

const MyOrder = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [status, setStatus] = useState("PENDING");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const {
    data: dataOrder,
    isLoading: isLoadingOrder,
    isError,
  } = useGetOrdersByCurrentUserQuery(status);

  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  if (!token) {
    navigate("/login");
    return;
  }

  const handleTabChange = (value) => {
    setStatus(value);
  };

  const handleOpenDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedOrderId(null);
  };

  const handleOpenCancel = (orderId, e) => {
    if (e) e.stopPropagation();
    setOrderToCancel(orderId);
    setOpenCancel(true);
  };

  const handleCloseCancel = () => {
    setOpenCancel(false);
    setOrderToCancel(null);
  };

  const handleConfirmCancel = async () => {
    if (!orderToCancel) return;
    try {
      await cancelOrder(orderToCancel).unwrap();
      showSnackbar("Đã hủy đơn hàng", "success");
      handleCloseCancel();
      if (selectedOrderId === orderToCancel) {
        handleCloseDetail();
      }
    } catch (error) {
      if (error && error.data && error.data.message) {
        showSnackbar(`${error.data.message}`, "error");
      } else {
        showSnackbar("Hủy đơn hàng thất bại");
      }
    }
  };

  const handleCancelFromDetail = (orderId) => {
    handleOpenCancel(orderId);
  };

  const orderList = dataOrder || [];

  if (isLoadingOrder) {
    return <LoadingItem title={"Đang tải đơn hàng..."} />;
  }

  if (isError) {
    return <ErrorItem title={"Lỗi tải danh sách đơn hàng:"} />;
  }

  return (
    <Fragment>
      <WallpaperRepresentative titleHeader="Đơn hàng của tôi" />

      <Container maxWidth="lg">
        <CustomTabs
          defaultTab={status}
          tabs={ORDER_STATUS_TABS}
          onChange={handleTabChange}
        />

        {orderList.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              Không có đơn hàng nào trong trạng thái này.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {orderList.map((order) => (
              <Grid size={{ xs: 12 }} key={order.id}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    },
                    transition: "box-shadow 0.2s ease-in-out",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      flexWrap="wrap"
                      gap={2}
                      mb={2}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Mã đơn hàng: #{order.id}
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={"bold"}
                          mt={0.5}
                        >
                          Ngày đặt:{" "}
                          <Typography
                            component="span"
                            color="#666"
                            fontWeight={"normal"}
                          >
                            {dayjs(order.orderDate).format("DD/MM/YYYY HH:mm")}
                          </Typography>
                        </Typography>
                      </Box>
                      <Chip
                        label={
                          STATUS_CONFIG[order.orderStatus]?.label ||
                          order.orderStatus
                        }
                        color={
                          STATUS_CONFIG[order.orderStatus]?.color || "default"
                        }
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="body1" fontWeight={"bold"}>
                          Người nhận:{" "}
                          <Typography
                            component="span"
                            color="#666"
                            fontWeight={"normal"}
                          >
                            {order.customerName}
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={"bold"}
                          sx={{ mt: 0.5 }}
                        >
                          Số điện thoại:{" "}
                          <Typography
                            component="span"
                            color="#666"
                            fontWeight={"normal"}
                          >
                            {order.address?.phone}
                          </Typography>
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={"bold"}
                          sx={{ mt: 0.5 }}
                        >
                          Địa chỉ:{" "}
                          <Typography
                            component="span"
                            color="#666"
                            fontWeight={"normal"}
                          >
                            {order.address?.streetDetail},{" "}
                            {order.address.ward?.name},{" "}
                            {order.address.district?.name}
                          </Typography>
                        </Typography>
                      </Grid>
                      <Grid
                        size={{ xs: 12, sm: 6 }}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "flex-end" }}
                      >
                        <Box
                          textAlign={{ xs: "left", sm: "right" }}
                          mb={{ xs: 2, sm: 0 }}
                        >
                          <Typography variant="body1" color="#666">
                            Tổng thanh toán
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="black"
                          >
                            {order.totalPrice.toLocaleString("vi-VN")}đ
                          </Typography>
                        </Box>

                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => handleOpenDetail(order.id)}
                        >
                          Xem chi tiết đơn hàng
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <OrderDetailDialog
        open={openDetail}
        onClose={handleCloseDetail}
        orderId={selectedOrderId}
        onCancelOrder={handleCancelFromDetail}
      />

      <CancelConfirmDialog
        open={openCancel}
        onClose={handleCloseCancel}
        onConfirm={handleConfirmCancel}
        isCancelling={isCancelling}
      />
    </Fragment>
  );
};

export default MyOrder;
