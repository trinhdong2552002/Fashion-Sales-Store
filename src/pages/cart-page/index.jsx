import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "@/components/snackbar";
import {
  useGetAllFetchedPaginatedByCurrentUserQuery,
  useLazyGetAllFetchedPaginatedByCurrentUserQuery,
} from "@/services/api/cart";
import {
  useUpdateCartItemMutation,
  useDeleteCartItemByIdMutation,
} from "@/services/api/cart-item";
import CartItemRow from "./shared/cart-item-row";
import CartSummary from "./shared/cart-summary";
import EmptyCart from "./shared/empty-cart";
import {
  DeleteItemDialog,
  ClearAllCartDialog,
} from "./shared/cart-delete-dialog";
import WallpaperRepresentative from "@/components/wallpaper-representative";

const PAGE_SIZE = 5;

const CartPage = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { authenticated } = useSelector((state) => state.auth);
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = authenticated || Boolean(token);

  const [page, setPage] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Initial page 0 query
  const {
    data: dataCartByUser,
    isLoading: isInitialLoading,
    isFetching: isInitialFetching,
    isError,
    error,
    refetch,
  } = useGetAllFetchedPaginatedByCurrentUserQuery(
    {
      page: 0,
      size: PAGE_SIZE,
    },
    { skip: !isLoggedIn },
  );

  // Lazy query for subsequent pages
  const [fetchLazyCartItems] =
    useLazyGetAllFetchedPaginatedByCurrentUserQuery();

  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItemById, { isLoading: isDeletingSingle }] =
    useDeleteCartItemByIdMutation();
  const [isClearingAll, setIsClearingAll] = useState(false);

  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openClearAllModal, setOpenClearAllModal] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);

  const sentinelRef = useRef(null);

  // When initial query data returns or updates (e.g. tag invalidation after update/delete)
  useEffect(() => {
    if (dataCartByUser?.result) {
      const initialItems = dataCartByUser.result.items || [];
      const totalPages = dataCartByUser.result.totalPages || 1;
      const totalItems = dataCartByUser.result.totalItems || 0;

      setCartItems(initialItems);
      setPage(0);
      setHasMore(totalPages > 1 && initialItems.length < totalItems);
    } else if (!isLoggedIn) {
      setCartItems([]);
    }
  }, [dataCartByUser, isLoggedIn]);

  // Load next page function
  const loadMoreItems = useCallback(async () => {
    if (!hasMore || isLoadingMore || isInitialFetching) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);

    try {
      const response = await fetchLazyCartItems({
        page: nextPage,
        size: PAGE_SIZE,
      }).unwrap();

      if (response?.result) {
        const newItems = response.result.items || [];
        const totalPages = response.result.totalPages || 1;
        const totalItems = response.result.totalItems || 0;

        setCartItems((prev) => {
          const existingIds = new Set(prev.map((i) => i.id));
          const uniqueNew = newItems.filter((i) => !existingIds.has(i.id));
          const merged = [...prev, ...uniqueNew];
          setHasMore(nextPage < totalPages - 1 && merged.length < totalItems);
          return merged;
        });

        setPage(nextPage);
      }
    } catch (err) {
      console.error("Failed to load more cart items:", err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore, isInitialFetching, page, fetchLazyCartItems]);

  // IntersectionObserver for infinite scrolling lazy load
  useEffect(() => {
    if (!hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      {
        root: null,
        rootMargin: "150px",
        threshold: 0.1,
      },
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, isLoadingMore, loadMoreItems]);

  // Sync selected item IDs when cart items first load or change
  useEffect(() => {
    if (cartItems.length > 0) {
      setSelectedItemIds((prev) => {
        if (prev.length === 0) {
          return cartItems.map((item) => item.id);
        }
        const currentItemIds = new Set(cartItems.map((item) => item.id));
        const filtered = prev.filter((id) => currentItemIds.has(id));
        return filtered.length > 0
          ? filtered
          : cartItems.map((item) => item.id);
      });
    } else {
      setSelectedItemIds([]);
    }
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const totalItemsCount =
    dataCartByUser?.result?.totalItems || cartItems.length;

  const isAllSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => selectedItemIds.includes(item.id));

  const isIndeterminate =
    selectedItemIds.length > 0 && selectedItemIds.length < cartItems.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(cartItems.map((item) => item.id));
    }
  };

  const handleToggleSelect = (itemId) => {
    setSelectedItemIds((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleUpdateQuantity = async (itemOrId, newQuantity) => {
    if (newQuantity < 1) return;
    const item =
      typeof itemOrId === "object"
        ? itemOrId
        : cartItems.find((i) => i.id === itemOrId);
    if (!item) return;

    const itemId = item.id;
    const colorId =
      item.productVariantBasic?.color?.id ??
      item.productVariantBasic?.colorId ??
      item.color?.id ??
      item.colorId ??
      item.productVariant?.color?.id;

    const sizeId =
      item.productVariantBasic?.size?.id ??
      item.productVariantBasic?.sizeId ??
      item.size?.id ??
      item.sizeId ??
      item.productVariant?.size?.id;

    setUpdatingItemId(itemId);
    try {
      await updateCartItem({
        cartItemId: itemId,
        colorId,
        sizeId,
        quantity: newQuantity,
      }).unwrap();
    } catch (err) {
      showSnackbar(err?.data?.message || "Cập nhật số lượng thất bại", "error");
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleOpenDeleteModal = (item) => {
    setItemToDelete(item);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await deleteCartItemById(itemToDelete.id).unwrap();
      showSnackbar("Xoá sản phẩm khỏi giỏ hàng thành công", "success");
      setSelectedItemIds((prev) => prev.filter((id) => id !== itemToDelete.id));
      handleCloseDeleteModal();
    } catch (err) {
      showSnackbar(
        err?.data?.message || "Xoá sản phẩm thất bại. Vui lòng thử lại.",
        "error",
      );
    }
  };

  const handleConfirmClearAll = async () => {
    if (cartItems.length === 0) return;
    setIsClearingAll(true);
    try {
      for (const item of cartItems) {
        await deleteCartItemById(item.id).unwrap();
      }
      showSnackbar("Đã xoá toàn bộ sản phẩm trong giỏ hàng", "success");
      setCartItems([]);
      setSelectedItemIds([]);
      setOpenClearAllModal(false);
    } catch (err) {
      showSnackbar(
        err?.data?.message || "Không thể xoá giỏ hàng. Vui lòng thử lại.",
        "error",
      );
    } finally {
      setIsClearingAll(false);
    }
  };

  const selectedItems = useMemo(() => {
    return cartItems.filter((item) => selectedItemIds.includes(item.id));
  }, [cartItems, selectedItemIds]);

  const subtotal = useMemo(() => {
    return selectedItems.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
      0,
    );
  }, [selectedItems]);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      showSnackbar(
        "Vui lòng chọn ít nhất một sản phẩm để thanh toán",
        "warning",
      );
      return;
    }

    const orderItems = selectedItems.map((item) => ({
      cartItemId: item.id,
      productVariantId: item.productVariantBasic?.id,
      productName: item.productVariantBasic?.product?.name,
      productImage: item.image?.imageUrl,
      color: item.productVariantBasic?.color?.name,
      size: item.productVariantBasic?.size?.name,
      price: item.price,
      quantity: item.quantity,
    }));

    navigate("/checkout", {
      state: {
        orderItems: orderItems,
        orderInfo: orderItems.length === 1 ? orderItems[0] : undefined,
      },
    });
  };

  // Not logged in view
  if (!isLoggedIn) {
    return (
      <Fragment>
        <WallpaperRepresentative titleHeader="Chi tiết giỏ hàng" />
        <Container maxWidth="xl" sx={{ my: 4 }}>
          <EmptyCart isGuest={true} />
        </Container>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <WallpaperRepresentative titleHeader="Chi tiết giỏ hàng" />

      <Container maxWidth="xl" sx={{ my: 4 }}>
        {/* Initial Loading state */}
        {isInitialLoading ? (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 7, lg: 8 }}>
              <Stack spacing={2}>
                {[1, 2, 3].map((i) => (
                  <Paper
                    key={i}
                    variant="outlined"
                    sx={{ p: 2.5, borderRadius: 3 }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Skeleton variant="rectangular" width={24} height={24} />
                      <Skeleton
                        variant="rounded"
                        width={80}
                        height={80}
                        sx={{ borderRadius: 2 }}
                      />
                      <Box flex={1}>
                        <Skeleton variant="text" width="60%" height={28} />
                        <Skeleton variant="text" width="30%" height={20} />
                        <Skeleton variant="text" width="20%" height={24} />
                      </Box>
                      <Skeleton variant="rounded" width={100} height={36} />
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5, lg: 4 }}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                <Skeleton variant="text" width="50%" height={32} />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={60}
                  sx={{ my: 2 }}
                />
                <Skeleton variant="text" width="100%" height={24} />
                <Skeleton variant="text" width="100%" height={24} />
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={48}
                  sx={{ mt: 3 }}
                />
              </Paper>
            </Grid>
          </Grid>
        ) : isError ? (
          /* Error state */
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 3,
              bgcolor: "#fff1f0",
              border: "1px solid #ffa39e",
              my: 4,
            }}
          >
            <Typography variant="h6" color="error" gutterBottom>
              Đã có lỗi xảy ra khi tải giỏ hàng
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              {error?.data?.message || "Vui lòng kiểm tra kết nối và thử lại."}
            </Typography>
            <Button
              variant="contained"
              onClick={() => refetch()}
              sx={{
                bgcolor: "#000",
                color: "#fff",
                "&:hover": { bgcolor: "#222" },
              }}
            >
              Thử lại
            </Button>
          </Paper>
        ) : cartItems.length === 0 ? (
          /* Empty Cart state */
          <EmptyCart isGuest={false} />
        ) : (
          /* Main Cart Content */
          <Grid container spacing={4}>
            {/* Left column: Cart Items list */}
            <Grid size={{ xs: 12, md: 7, lg: 8 }}>
              {/* Select all & Actions bar */}
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  px: { xs: 2, sm: 2.5 },
                  mb: 2.5,
                  borderRadius: 3,
                  borderColor: "#e0e0e0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "#fff",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      onChange={handleToggleSelectAll}
                      sx={{
                        color: "#999",
                        "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                          color: "#000",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="subtitle2" fontWeight="600">
                      Chọn tất cả ({totalItemsCount} sản phẩm)
                    </Typography>
                  }
                />

                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteOutline />}
                  onClick={() => setOpenClearAllModal(true)}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Xoá tất cả
                </Button>
              </Paper>

              {/* Items stack */}
              <Stack spacing={2}>
                {cartItems.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    isSelected={selectedItemIds.includes(item.id)}
                    onToggleSelect={handleToggleSelect}
                    onUpdateQuantity={handleUpdateQuantity}
                    onOpenDeleteModal={handleOpenDeleteModal}
                    isUpdating={updatingItemId === item.id}
                  />
                ))}
              </Stack>

              {/* Lazy Loading Sentinel & Progress Indicator */}
              {hasMore && (
                <Box
                  ref={sentinelRef}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 4,
                    mt: 2,
                  }}
                >
                  <CircularProgress size={32} sx={{ color: "#000", mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Đang tải thêm sản phẩm...
                  </Typography>
                </Box>
              )}

              {/* Loading more spinner if triggered programmatically */}
              {isLoadingMore && !hasMore && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 3,
                  }}
                >
                  <CircularProgress size={28} sx={{ color: "#000" }} />
                </Box>
              )}
            </Grid>

            {/* Right column: Order Summary */}
            <Grid size={{ xs: 12, md: 5, lg: 4 }}>
              <Box sx={{ position: { md: "sticky" }, top: { md: 100 } }}>
                <CartSummary
                  selectedCount={selectedItems.length}
                  subtotal={subtotal}
                  onCheckout={handleCheckout}
                  disabled={
                    isInitialFetching || isClearingAll || isDeletingSingle
                  }
                />
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Delete Item Confirmation Dialog */}
      <DeleteItemDialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete?.productVariantBasic?.product?.name}
        isDeleting={isDeletingSingle}
      />

      {/* Clear All Cart Dialog */}
      <ClearAllCartDialog
        open={openClearAllModal}
        onClose={() => setOpenClearAllModal(false)}
        onConfirm={handleConfirmClearAll}
        isClearing={isClearingAll}
      />
    </Fragment>
  );
};

export default CartPage;
