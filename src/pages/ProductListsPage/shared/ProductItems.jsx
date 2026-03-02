import {
  Card,
  CardContent,
  Grid,
  Pagination,
  Skeleton,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect, useMemo, Fragment } from "react";

import { useListProductsForUserQuery } from "@/services/api/product";
import { slugify } from "@/utils/slugify";
import CardProduct from "./CardProduct";

// Vietnamese character encoding normalization for search
const normalizeString = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD") // Split accents from letters
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

const ProductItems = ({ selectedCategory, searchQuery }) => {
  const [clientPageNo, setClientPageNo] = useState(1);
  const [pageSize] = useState(18);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    setClientPageNo(1);
  }, [selectedCategory, searchQuery]);

  const {
    data: dataProducts,
    isLoading,
    isError,
    error,
    refetch: refetchProduct,
  } = useListProductsForUserQuery({
    pageNo: 1,
    pageSize: 100,
  });

  useEffect(() => {
    refetchProduct();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [clientPageNo]);

  const filteredProducts = useMemo(() => {
    // Handle data structure safety
    const items = dataProducts?.result?.items || dataProducts?.items || [];

    return items.filter((item) => {
      // A. Check Category
      const matchesCategory = selectedCategory
        ? item.category?.name &&
          slugify(item.category.name) === selectedCategory
        : true;

      // B. Check Search (Client Side)
      const matchesSearch = searchQuery
        ? normalizeString(item.name || "").includes(
            normalizeString(searchQuery),
          )
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [dataProducts, selectedCategory, searchQuery]);

  // Sort products based on selected sort type
  const sortedProducts = useMemo(() => {
    if (!filteredProducts || filteredProducts.length === 0) return [];

    const products = [...filteredProducts];

    switch (sortType) {
      case "price_asc":
        return products.sort((a, b) => a.price - b.price);

      case "price_desc":
        return products.sort((a, b) => b.price - a.price);

      case "name_asc":
        return products.sort((a, b) => {
          const nameA = (a.name || "").toLowerCase();
          const nameB = (b.name || "").toLowerCase();
          return nameA.localeCompare(nameB);
        });

      case "name_desc":
        return products.sort((a, b) => {
          const nameA = (a.name || "").toLowerCase();
          const nameB = (b.name || "").toLowerCase();
          return nameB.localeCompare(nameA);
        });

      default:
        return products;
    }
  }, [filteredProducts, sortType]);

  // Client-side pagination calculations
  const totalFilteredProducts = sortedProducts.length;
  const totalClientPages = Math.ceil(totalFilteredProducts / pageSize);
  const startIndex = (clientPageNo - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setClientPageNo(value);
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
    setClientPageNo(1);
  };

  // Check if there are no products to display
  const hasNoProducts =
    !isLoading &&
    !isError &&
    (!currentPageProducts || currentPageProducts.length === 0);

  return (
    <Fragment>
      {/* Sort Control */}
      {totalFilteredProducts > 0 && (
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
          <FormControl color="inherit" size="small" sx={{ minWidth: 200 }}>
            <InputLabel color="inherit">Sắp xếp theo</InputLabel>
            <Select
              color="inherit"
              value={sortType}
              label="Sắp xếp theo"
              onChange={handleSortChange}
            >
              <MenuItem color="inherit" value="">
                Mặc định
              </MenuItem>
              <MenuItem color="inherit" value="price_asc">
                Giá: Thấp đến cao
              </MenuItem>
              <MenuItem color="inherit" value="price_desc">
                Giá: Cao đến thấp
              </MenuItem>
              <MenuItem color="inherit" value="name_asc">
                Tên: A-Z
              </MenuItem>
              <MenuItem color="inherit" value="name_desc">
                Tên: Z-A
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      {isLoading ? (
        <Grid container spacing={2} columns={10}>
          {[...Array(pageSize)].map((_, index) => (
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
          sx={{ py: 8, width: "100%", textAlign: "center" }}
        >
          <Typography
            variant="h6"
            color="#666"
            fontSize={{
              xs: "1rem",
              sm: "1rem",
              md: "1.2rem",
            }}
          >
            Không có sản phẩm nào để hiển thị.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {currentPageProducts?.map((product) => (
            <Grid size={{ xl: 2, lg: 3, md: 3, sm: 4, xs: 6 }} key={product.id}>
              <CardProduct product={product} />
            </Grid>
          ))}

          {/* Client-side pagination */}
          {totalClientPages > 0 && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{ width: "100%", mt: 10 }}
            >
              <Pagination
                count={totalClientPages}
                page={clientPageNo}
                onChange={handlePageChange}
                size="large"
                variant="outlined"
              />
            </Box>
          )}
        </Grid>
      )}
    </Fragment>
  );
};

export default ProductItems;
