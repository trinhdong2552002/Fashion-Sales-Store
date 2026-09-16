import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import { DeleteOutline, WarningAmberRounded } from "@mui/icons-material";

export const DeleteItemDialog = ({
  open,
  onClose,
  onConfirm,
  itemName,
  isDeleting,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1 },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", pt: 2, pb: 1 }}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            bgcolor: "#fff1f0",
            color: "#f5222d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 1.5,
          }}
        >
          <DeleteOutline sx={{ fontSize: 28 }} />
        </Box>
        <Typography variant="h6" fontWeight="bold">
          Xoá sản phẩm khỏi giỏ hàng?
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", py: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Bạn có chắc chắn muốn xoá{" "}
          <Typography
            component="span"
            variant="body2"
            fontWeight="bold"
            color="text.primary"
          >
            {itemName ? `"${itemName}"` : "sản phẩm này"}
          </Typography>{" "}
          khỏi giỏ hàng không?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2, gap: 1.5 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isDeleting}
          sx={{
            borderColor: "#ccc",
            color: "#333",
            px: 3,
            "&:hover": { borderColor: "#999", bgcolor: "#f5f5f5" },
          }}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isDeleting}
          sx={{
            bgcolor: "#000",
            color: "#fff",
            px: 3,
            "&:hover": { bgcolor: "#d32f2f" },
          }}
        >
          {isDeleting ? "Đang xoá..." : "Xác nhận xoá"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ClearAllCartDialog = ({
  open,
  onClose,
  onConfirm,
  isClearing,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1 },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", pt: 2, pb: 1 }}>
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            bgcolor: "#fff7e6",
            color: "#fa8c16",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 1.5,
          }}
        >
          <WarningAmberRounded sx={{ fontSize: 28 }} />
        </Box>
        <Typography variant="h6" fontWeight="bold">
          Xoá toàn bộ giỏ hàng?
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", py: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Tất cả các sản phẩm hiện có trong giỏ hàng sẽ bị xoá. Bạn có chắc chắn
          muốn thực hiện thao tác này?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2, gap: 1.5 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isClearing}
          sx={{
            borderColor: "#ccc",
            color: "#333",
            px: 3,
            "&:hover": { borderColor: "#999", bgcolor: "#f5f5f5" },
          }}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isClearing}
          sx={{
            color: "#fff",
            px: 3,
          }}
        >
          {isClearing ? "Đang xử lý..." : "Xoá tất cả"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
