import {
  Card,
  CardContent,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import SortOptions from "./SortOptions";
import {
  useListProductsForUserQuery,
  useSearchProductsQuery,
} from "@/services/api/product";

const ITEMS_PER_PAGE = 20;

const SortProducts = ({ searchTerm, onLoadingChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortType, setSortType] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Tính skip dựa trên currentPage
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // Gọi API dựa trên searchTerm
  const listQuery = useListProductsForUserQuery(
    { skip, limit: ITEMS_PER_PAGE },
    { skip: !!searchTerm }
  );
  const searchQuery = useSearchProductsQuery(
    { q: searchTerm, skip, limit: ITEMS_PER_PAGE },
    { skip: !searchTerm }
  );

  // Sử dụng query phù hợp
  const { data, isLoading, error, refetch } = searchTerm ? searchQuery : listQuery;

  // Sử dụng useEffect để cập nhật trạng thái loading
  useEffect(() => {
    onLoadingChange(isLoading);
  }, [isLoading, onLoadingChange]);

  // Lấy danh sách sản phẩm và tổng số trang từ data
  const products = data?.products || [];
  const totalPages = data?.total ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  // Sắp xếp sản phẩm ở client-side dựa trên sortType
  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "asc") return a.price - b.price;
    if (sortType === "desc") return b.price - a.price;
    if (sortType === "popularity") return b.rating - a.rating;
    if (sortType === "newest") return b.id - a.id;
    return 0;
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (type) => {
    setSortType(type);
    setCurrentPage(1);
    handleClose();
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRetry = () => {
    refetch(); // Gọi lại API khi người dùng bấm "Thử lại"
  };

  if (error) {
    return (
      <Stack
        sx={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error">
          Đã có lỗi xảy ra: {error.message || "Không thể tải sản phẩm"}
        </Typography>
        <Button
          variant="contained"
          onClick={handleRetry}
          sx={{ mt: 2 }}
        >
          Thử lại
        </Button>
      </Stack>
    );
  }

  return (
    <>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-around"}
        sx={{
          backgroundColor: "#f9f9f9",
          width: "100%",
          height: 108,
        }}
      >
        <SortOptions
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleSort={handleSort}
          open={open}
          sortType={sortType}
          handleClick={handleClick}
        />
      </Stack>

      <Grid container spacing={2} columns={10}>
        {isLoading
          ? Array.from(new Array(ITEMS_PER_PAGE)).map((_, index) => (
              <Grid item xl={2} lg={2} key={index}>
                <Card sx={{ mt: 2 }}>
                  <Skeleton variant="rectangular" height={180} />
                  <CardContent>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : sortedProducts.map((product) => (
              <Grid
                item
                xl={2}
                lg={2}
                onClick={() => navigate(`/product-details/${product.id}`)}
                key={product.id}
              >
                <ProductCard product={product} />
              </Grid>
            ))}

        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
          sx={{ width: "100%", m: 10 }}
        >
          <Pagination
            size="large"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
          />
        </Stack>
      </Grid>
    </>
  );
};

export default SortProducts;