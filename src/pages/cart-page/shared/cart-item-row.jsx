import {
  Box,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";

const CartItemRow = ({
  item,
  isSelected,
  onToggleSelect,
  onUpdateQuantity,
  onOpenDeleteModal,
  isUpdating,
}) => {
  const product = item?.productVariantBasic?.product || item?.product;
  const color =
    item?.productVariantBasic?.color ||
    item?.color ||
    item?.productVariant?.color;
  const size =
    item?.productVariantBasic?.size || item?.size || item?.productVariant?.size;

  const colorName =
    typeof color === "string"
      ? color
      : color?.name || item?.productVariantBasic?.colorName || null;

  const sizeName =
    typeof size === "string"
      ? size
      : size?.name || item?.productVariantBasic?.sizeName || null;

  const productId = product?.id || item?.productId;
  const productName =
    product?.name || item?.productName || "Sản phẩm thời trang";
  const imageUrl =
    item?.image?.imageUrl ||
    item?.productVariantBasic?.image?.imageUrl ||
    product?.images?.[0]?.imageUrl ||
    "https://via.placeholder.com/100";
  const unitPrice = item?.price || 0;
  const quantity = item?.quantity || 1;
  const itemTotal = unitPrice * quantity;

  const handleDecrease = () => {
    if (quantity > 1 && !isUpdating) {
      onUpdateQuantity(item, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (!isUpdating) {
      onUpdateQuantity(item, quantity + 1);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        borderColor: isSelected ? "#000" : "#e0e0e0",
        bgcolor: isSelected ? "#fafafa" : "#fff",
        transition: "all 0.2s ease-in-out",
        boxShadow: isSelected
          ? "0 4px 12px rgba(0,0,0,0.06)"
          : "0 1px 3px rgba(0,0,0,0.02)",
        "&:hover": {
          borderColor: isSelected ? "#000" : "#bbb",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Left section: Checkbox, Image, Info */}
        <Grid
          size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}
          display="flex"
          alignItems="center"
          gap={{ xs: 1.5, sm: 2 }}
        >
          <Checkbox
            checked={isSelected}
            onChange={() => onToggleSelect(item.id)}
            sx={{
              color: "#999",
              "&.Mui-checked": {
                color: "#000",
              },
              p: 0.5,
              flexShrink: 0,
            }}
          />

          {/* Product Thumbnail */}
          <Box
            component={productId ? Link : "div"}
            to={productId ? `/product-details/${productId}` : undefined}
            sx={{
              width: { xs: 65, sm: 80 },
              height: { xs: 65, sm: 80 },
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #eee",
              flexShrink: 0,
              display: "block",
              textDecoration: "none",
              bgcolor: "#f5f5f5",
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={productName}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            />
          </Box>

          {/* Product Info */}
          <Box flex={1} minWidth={0}>
            <Typography
              component={productId ? Link : "span"}
              to={productId ? `/product-details/${productId}` : undefined}
              variant="subtitle1"
              fontWeight="600"
              sx={{
                color: "text.primary",
                textDecoration: "none",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                lineHeight: 1.3,
                "&:hover": {
                  color: "#000",
                  textDecoration: productId ? "underline" : "none",
                },
              }}
            >
              {productName}
            </Typography>

            {/* Variant tags */}
            <Box display="flex" flexWrap="wrap" gap={0.8} mt={0.8}>
              {colorName && (
                <Chip
                  size="small"
                  label={`Màu: ${colorName}`}
                  variant="outlined"
                  sx={{
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    borderColor: "#ddd",
                    bgcolor: "#f8f8f8",
                  }}
                />
              )}
              {sizeName && (
                <Chip
                  size="small"
                  label={`Size: ${sizeName}`}
                  variant="outlined"
                  sx={{
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    borderColor: "#ddd",
                    bgcolor: "#f8f8f8",
                  }}
                />
              )}
            </Box>
          </Box>
        </Grid>

        {/* Right section: Unit Price, Quantity, Subtotal, Delete */}
        <Grid
          size={{ xs: 12, sm: 12, md: 12, lg: 6, xl: 6 }}
          display="flex"
          alignItems="center"
          justifyContent={{ xs: "space-between", lg: "flex-end" }}
          flexWrap="wrap"
          gap={{ xs: 1.5, sm: 2 }}
          pt={{ xs: 1.5, lg: 0 }}
          borderTop={{ xs: "1px dashed #eee", lg: "none" }}
        >
          {/* Unit Price */}
          <Box
            textAlign={{ xs: "left", lg: "right" }}
            minWidth={{ xs: "auto", sm: 80, lg: 85 }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Đơn giá
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {unitPrice.toLocaleString("vi-VN")}đ
            </Typography>
          </Box>

          {/* Quantity Stepper */}
          <Box
            display="flex"
            alignItems="center"
            sx={{
              border: "1px solid #d0d0d0",
              borderRadius: 2,
              bgcolor: "#fff",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <IconButton
              size="small"
              onClick={handleDecrease}
              disabled={quantity <= 1 || isUpdating}
              sx={{
                p: 0.6,
                borderRadius: 0,
                color: "#333",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              <Remove fontSize="small" />
            </IconButton>

            <Box
              sx={{
                minWidth: 32,
                textAlign: "center",
                fontWeight: "600",
                fontSize: "0.9rem",
                px: 0.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isUpdating ? (
                <CircularProgress size={14} color="inherit" />
              ) : (
                quantity
              )}
            </Box>

            <IconButton
              size="small"
              onClick={handleIncrease}
              disabled={isUpdating}
              sx={{
                p: 0.6,
                borderRadius: 0,
                color: "#333",
                "&:hover": { bgcolor: "#f0f0f0" },
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>

          {/* Item Total */}
          <Box
            textAlign="right"
            minWidth={{ xs: "auto", sm: 90, lg: 100 }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              Thành tiền
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#000"
              sx={{ fontSize: { xs: "0.95rem", sm: "1.05rem" } }}
            >
              {itemTotal.toLocaleString("vi-VN")}đ
            </Typography>
          </Box>

          {/* Delete Action */}
          <Tooltip title="Xoá khỏi giỏ hàng">
            <IconButton
              onClick={() => onOpenDeleteModal(item)}
              size="small"
              sx={{
                color: "#888",
                p: 0.8,
                "&:hover": { color: "#d32f2f", bgcolor: "#fff1f0" },
              }}
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItemRow;
