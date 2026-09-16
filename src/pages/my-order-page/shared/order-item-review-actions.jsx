import { useState } from "react";
import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import AddDialog from "@/components/dialog/add-dialog";
import EditDialog from "@/components/dialog/edit-dialog";
import DeleteDialog from "@/components/dialog/delete-dialog";
import SeeDetailDialog from "@/components/dialog/see-detail-dialog";
import { useSnackbar } from "@/components/snackbar";
import {
  useCreateReviewByUserMutation,
  useUpdateReviewByUserMutation,
  useDeleteReviewByUserMutation,
  useGetReviewByOrderItemIdTheCurrentUserQuery,
} from "@/services/api/review";

const OrderItemReviewActions = ({ orderItemId }) => {
  const { showSnackbar } = useSnackbar();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data: dataReview, isLoading } =
    useGetReviewByOrderItemIdTheCurrentUserQuery(orderItemId);

  const [createReview] = useCreateReviewByUserMutation();
  const [updateReview] = useUpdateReviewByUserMutation();
  const [deleteReview] = useDeleteReviewByUserMutation();

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSee, setOpenSee] = useState(false);

  const handleOpenAdd = () => {
    setRating(5);
    setComment("");
    setOpenAdd(true);
  };

  const handleOpenEdit = () => {
    if (dataReview) {
      setRating(dataReview.rating);
      setComment(dataReview.comment);
    }
    setOpenEdit(true);
  };

  const handleSubmitAdd = async () => {
    if (!rating) {
      showSnackbar("Vui lòng chọn số sao đánh giá!", "warning");
      return;
    }
    try {
      await createReview({
        orderItemId,
        rating,
        comment,
      }).unwrap();
      showSnackbar("Đánh giá sản phẩm thành công!", "success");
      setOpenAdd(false);
    } catch (error) {
      if (error && error.data && error.data.message) {
        showSnackbar(`${error.data.message}`, "error");
      } else {
        showSnackbar("Có lỗi xảy ra khi tạo đánh giá");
      }
    }
  };

  const handleSubmitEdit = async () => {
    if (!rating) {
      showSnackbar("Vui lòng chọn số sao đánh giá!", "warning");
      return;
    }
    try {
      await updateReview({
        reviewId: dataReview.id,
        rating,
        comment,
      }).unwrap();
      showSnackbar("Cập nhật đánh giá thành công!", "success");
      setOpenEdit(false);
    } catch (err) {
      showSnackbar(
        err?.data?.message || "Có lỗi xảy ra khi cập nhật đánh giá.",
        "error",
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteReview(dataReview.id).unwrap();
      showSnackbar("Xóa đánh giá thành công!", "success");
      setOpenDelete(false);
    } catch (err) {
      showSnackbar(
        err?.data?.message || "Có lỗi xảy ra khi xóa đánh giá.",
        "error",
      );
    }
  };

  if (isLoading) {
    return <CircularProgress size={20} />;
  }

  // If review exists, show Read, Update, Delete actions
  if (dataReview) {
    return (
      <Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setOpenSee(true)}
            sx={{
              borderColor: "black",
              color: "black",
              "&:hover": {
                borderColor: "black",
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            Xem đánh giá
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleOpenEdit}
          >
            Sửa
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => setOpenDelete(true)}
          >
            Xóa
          </Button>
        </Stack>

        {/* Read Dialog */}
        <SeeDetailDialog
          open={openSee}
          onClose={() => setOpenSee(false)}
          title="Chi tiết đánh giá"
        >
          <Box display="flex" flexDirection="column" gap={2} sx={{ p: 1 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body1" fontWeight="bold">
                Đánh giá sao:
              </Typography>
              <Rating value={dataReview.rating} readOnly size="large" />
            </Box>
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Nhận xét:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  p: 2,
                  bgcolor: "#f9f9f9",
                  borderRadius: 2,
                  whiteSpace: "pre-line",
                  border: "1px solid #eee",
                }}
              >
                {dataReview.comment || "Không có nhận xét."}
              </Typography>
            </Box>
          </Box>
        </SeeDetailDialog>

        {/* Edit Dialog */}
        <EditDialog
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          onSubmit={handleSubmitEdit}
          title="Chỉnh sửa đánh giá"
        >
          <Box display="flex" flexDirection="column" gap={2} sx={{ py: 1 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body1" fontWeight="bold">
                Đánh giá sao:
              </Typography>
              <Rating
                value={rating}
                onChange={(e, val) => setRating(val || 5)}
                size="large"
              />
            </Box>
            <TextField
              label="Nhận xét"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này..."
            />
            <Box></Box>
          </Box>
        </EditDialog>

        {/* Delete Dialog */}
        <DeleteDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={handleConfirmDelete}
          title="Xóa đánh giá"
          description="Bạn có chắc chắn muốn xóa đánh giá này không? Hành động này không thể hoàn tác."
        />
      </Box>
    );
  }

  // Otherwise, show Create action ("Viết đánh giá")
  return (
    <Box>
      <Button
        variant="contained"
        size="small"
        onClick={handleOpenAdd}
        sx={{
          bgcolor: "black",
          color: "white",
          "&:hover": { bgcolor: "#333" },
        }}
      >
        Viết đánh giá
      </Button>

      {/* Add Dialog */}
      <AddDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleSubmitAdd}
        title="Đánh giá sản phẩm"
      >
        <Box display="flex" flexDirection="column" gap={2} sx={{ py: 1 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" fontWeight="bold">
              Đánh giá sao:
            </Typography>
            <Rating
              value={rating}
              onChange={(e, val) => setRating(val || 5)}
              size="large"
            />
          </Box>
          <TextField
            label="Nhận xét"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này..."
          />
        </Box>
      </AddDialog>
    </Box>
  );
};

export default OrderItemReviewActions;
