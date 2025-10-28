import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Alert,
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductActions from "./shared/ProductActions";

import { useGetProductByIdQuery } from "@/services/api/product";
import {
  useGetProductVariantByProductQuery,
  // useListAllProductVariantsByProductQuery,
} from "@/services/api/productVariant";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch products details by ID
  const {
    data: dataProductById,
    isLoading: isLoadingProductById,
    isError: isErrorProductById,
    error: errorProductById,
    refetch: refetchProductById,
  } = useGetProductByIdQuery(id);

  // const { data: dataProductVariantsByProduct } =
  //   useListAllProductVariantsByProductQuery(
  //     id ? { id, pageNo: 1, pageSize: 50 } : skipToken
  //   );

  // Fetch variant details when color and size are selected
  const { data: dataProductVariantByProduct, isLoading: isLoadingVariant } =
    useGetProductVariantByProductQuery(
      //  Check if both color and size are selected (is true) then call api else skip the query API not called
      selectedColor && selectedSize
        ? {
            productId: id,
            colorId: selectedColor.id,
            sizeId: selectedSize.id,
          }
        : // If color or size not selected, skip the query API not called
          skipToken
    );

  useEffect(() => {
    refetchProductById();
  }, [refetchProductById]);

  // Get available stock from variant API
  const availableStock = dataProductVariantByProduct?.result?.quantity || 0;
  const variantPrice = dataProductVariantByProduct?.result?.price;
  const isVariantAvailable = dataProductVariantByProduct?.result?.isAvailable;

  // Reset quantity when variant changes
  useEffect(() => {
    if (dataProductVariantByProduct) {
      // Reset to 1 or max available stock if current quantity exceeds it
      setQuantity((prevQuantity) => {
        if (prevQuantity > availableStock) {
          return Math.min(1, availableStock);
        }
        return prevQuantity;
      });
    }
  }, [dataProductVariantByProduct, availableStock]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setQuantity(1); // Reset quantity when changing color
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setQuantity(1); // Reset quantity when changing size
  };

  const handleIncreaseQuantity = () => {
    if (quantity < availableStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const mainImage =
    dataProductById?.result?.images &&
    dataProductById?.result?.images.length > 0
      ? [...dataProductById.result.images].sort((a, b) => a.id - b.id)[0]
      : null;

  // Display price from variant if available, otherwise from product
  const displayPrice = variantPrice || dataProductById?.result?.price;

  return (
    <Fragment>
      <Container maxWidth="xl">
        <Box my={4}>
          {isLoadingProductById ? (
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="center"
              alignItems="center"
            >
              Đang tải chi tiết sản phẩm...
              <CircularProgress />
            </Box>
          ) : isErrorProductById ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              color={"red"}
            >
              Lỗi khi tải chi tiết sản phẩm:{" "}
              {errorProductById?.data?.message || "Lỗi không xác định"}
            </Box>
          ) : (
            <>
              <Grid container spacing={4}>
                <Grid size={{ xl: 6, lg: 6 }}>
                  <Box>
                    {/*TODO: Need to swiper horizontal here to get show all image */}
                    <img
                      key={mainImage?.id ?? "main"}
                      src={mainImage?.imageUrl}
                      alt={mainImage?.fileName}
                      style={{
                        width: "76%",
                        borderRadius: "4px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>

                <Grid size={{ xl: 6, lg: 6 }}>
                  {/* Product Title */}
                  <Typography variant="h5">
                    {dataProductById?.result?.name}
                  </Typography>

                  <Typography
                    mt={2}
                    variant="body1"
                    fontSize={"1.4rem"}
                    fontWeight={"600"}
                  >
                    {displayPrice?.toLocaleString("vi-VN")}đ
                  </Typography>

                  {/* Stock availability indicator */}
                  {selectedColor && selectedSize && (
                    <Box mt={2}>
                      {isLoadingVariant ? (
                        <Typography variant="body2" color="text.secondary">
                          Đang kiểm tra tồn kho...
                        </Typography>
                      ) : isVariantAvailable ? (
                        <Typography variant="body2" color="success.main">
                          Còn hàng: {availableStock} sản phẩm
                        </Typography>
                      ) : (
                        <Alert severity="error">
                          Sản phẩm này hiện đã hết hàng
                        </Alert>
                      )}
                    </Box>
                  )}

                  <Typography mt={4} mb={2} variant="body1" fontSize={"1.2rem"}>
                    Màu sắc: {selectedColor?.name || "Chưa chọn"}
                  </Typography>
                  {dataProductById?.result?.colors.map((color) => (
                    <Button
                      key={color.id}
                      onClick={() => handleColorSelect(color)}
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      variant="outlined"
                      sx={{
                        fontSize: "1rem",
                        mr: 1,
                        borderColor:
                          selectedColor?.id === color.id ? "white" : "black",
                        borderWidth: selectedColor?.id === color.id ? 2 : 1,
                        color:
                          selectedColor?.id === color.id ? "white" : "black",
                        bgcolor:
                          selectedColor?.id === color.id ? "black" : "white",
                      }}
                    >
                      {color.name}
                    </Button>
                  ))}

                  <Typography mt={4} mb={2} variant="body1" fontSize={"1.2rem"}>
                    Kích thước: {selectedSize?.name || "Chưa chọn"}
                  </Typography>
                  {dataProductById?.result?.sizes.map((size) => (
                    <Button
                      key={size.id}
                      onClick={() => handleSizeSelect(size)}
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      variant="outlined"
                      sx={{
                        fontSize: "1rem",
                        mr: 1,
                        borderColor:
                          selectedSize?.id === size.id ? "white" : "black",
                        borderWidth: selectedSize?.id === size.id ? 2 : 1,
                        color: selectedSize?.id === size.id ? "white" : "black",
                        bgcolor:
                          selectedSize?.id === size.id ? "black" : "white",
                      }}
                    >
                      {size.name}
                    </Button>
                  ))}

                  <Box display={"flex"} alignItems={"center"} mt={4} mb={2}>
                    <Button
                      variant="outlined"
                      sx={{
                        bgcolor: "white",
                        borderColor: "black",
                        color: "black",
                      }}
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <Typography mx={2}>{quantity}</Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        bgcolor: "white",
                        borderColor: "black",
                        color: "black",
                      }}
                      onClick={handleIncreaseQuantity}
                      disabled={
                        quantity >= availableStock || !isVariantAvailable
                      }
                    >
                      +
                    </Button>
                  </Box>

                  {/* Show warning when reaching max quantity */}
                  {quantity >= availableStock && availableStock > 0 && (
                    <Typography variant="body2" color="warning.main" mb={2}>
                      Đã đạt số lượng tối đa
                    </Typography>
                  )}

                  {/* Product Actions buy now and add product to cart */}
                  <ProductActions
                    variantId={dataProductVariantByProduct?.result?.id}
                    quantity={quantity}
                    disabled={
                      !selectedColor ||
                      !selectedSize ||
                      !isVariantAvailable ||
                      availableStock === 0
                    }
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </Fragment>
  );
};

export default ProductDetails;
