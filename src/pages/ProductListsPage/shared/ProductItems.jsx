import {
  Card,
  CardContent,
  Grid,
  Pagination,
  Skeleton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";

import { useListProductsForUserQuery } from "@/services/api/product";
import { slugify } from "@/utils/slugify";
import CardProduct from "./CardProduct";

const ProductItems = ({ selectedCategory }) => {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(12);

  const {
    data: dataProducts,
    isLoading,
    isError,
    error,
  } = useListProductsForUserQuery({
    pageNo,
    pageSize,
    refetchOnMountOrArgChange: true,
  });
  console.log(dataProducts);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // For smooth scrolling, use 'auto' for instant jump
    });
  }, [pageNo]);

  const selectedProducts = dataProducts?.items?.filter((item) => {
    if (selectedCategory) {
      return (
        item.category?.name && slugify(item.category.name) === selectedCategory
      );
    }
    return true;
  });
  console.log(selectedProducts);

  const handlePageChange = (event, value) => {
    setPageNo(value);
  };

  // Check if there are no products to display
  const hasNoProducts =
    !isLoading &&
    !isError &&
    (!selectedProducts || selectedProducts.length === 0);

  // const sortedProducts = [...products].sort((a, b) => {
  //   if (sortType === "asc") return a.price - b.price;
  //   if (sortType === "desc") return b.price - a.price;
  //   if (sortType === "popularity") return b.rating - a.rating;
  //   if (sortType === "newest") return b.id - a.id;
  //   return 0;
  // });

  return (
    <>
      {isLoading ? (
        <Grid container spacing={2} columns={10} p={2}>
          {[...Array(dataProducts?.pageSize)].map((_, index) => (
            <Grid size={2} key={index}>
              <Card sx={{ mt: 2 }}>
                <Skeleton variant="rectangular" height={180} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Typography color="error">{error.message}</Typography>
        </Box>
      ) : hasNoProducts ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ py: 8 }}
        >
          <Typography variant="h6" color="text.secondary">
            Không có sản phẩm nào để hiển thị.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {selectedProducts?.map((product) => (
            <Grid size={{ xl: 2, lg: 3, md: 3, sm: 4, xs: 6 }} key={product.id}>
              <CardProduct product={product} />
            </Grid>
          ))}

          {/* Only show pagination when there are products */}
          {selectedProducts && selectedProducts.length > 0 && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ width: "100%", m: 10 }}
            >
              <Pagination
                count={dataProducts?.totalPages}
                page={pageNo}
                onChange={handlePageChange}
                size="large"
                variant="outlined"
              />
            </Box>
          )}
        </Grid>
      )}
    </>
  );
};

export default ProductItems;
