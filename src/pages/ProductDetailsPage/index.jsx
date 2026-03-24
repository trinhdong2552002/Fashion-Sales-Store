import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import ProductActions from "./shared/ProductActions";

import { useGetProductByIdQuery } from "@/services/api/product";
import { useGetProductVariantByProductQuery } from "@/services/api/productVariant";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  const {
    data: dataProductById,
    isLoading: isLoadingProductById,
    isError: isErrorProductById,
    error: errorProductById,
    refetch: refetchProductById,
  } = useGetProductByIdQuery(id);

  // Fetch variant details when color and size are selected
  const { data: dataProductVariantByProduct, isLoading: isLoadingVariant } =
    useGetProductVariantByProductQuery(
      // TODO: Check if both color and size are selected (is true) then call api else skip the query API not called
      selectedColor && selectedSize
        ? {
            productId: id,
            colorId: selectedColor.id,
            sizeId: selectedSize.id,
          }
        : // TODO: If color or size not selected, skip the query API not called
          skipToken,
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
    setQuantity(1);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const handleIncreaseQuantity = () => {
    if (quantity < availableStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const images = dataProductById?.result?.images?.length
    ? [...dataProductById.result.images].sort((a, b) => a.id - b.id)
    : [];
  const mainImage = images[0] ?? null;

  // Initialize/reset selected image when product images load/change
  useEffect(() => {
    if (dataProductById?.result?.images?.length) {
      const first = [...dataProductById.result.images].sort(
        (a, b) => a.id - b.id,
      )[0];
      setSelectedImage(first);
    } else {
      setSelectedImage(null);
    }
  }, [id, dataProductById?.result?.images]);

  // Display price from variant if available, otherwise from product
  const displayPrice = variantPrice || dataProductById?.result?.price;

  const sortedColors = dataProductById?.result?.colors
    ? [...dataProductById.result.colors].sort((a, b) => a.id - b.id)
    : [];

  const sortedSizes = dataProductById?.result?.sizes
    ? [...dataProductById.result.sizes].sort((a, b) => a.id - b.id)
    : [];

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
              <CircularProgress />
              <Typography mt={2}>Đang tải chi tiết sản phẩm...</Typography>
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
            <Fragment>
              <Grid container spacing={4}>
                {/* Left panel - product images */}
                <Grid size={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 12 }}>
                  <>
                    {/* Main image */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {images.length ? (
                        <Swiper
                          modules={[Navigation, Thumbs]}
                          onSwiper={setMainSwiper}
                          navigation
                          thumbs={{
                            swiper:
                              thumbsSwiper && !thumbsSwiper.destroyed
                                ? thumbsSwiper
                                : null,
                          }}
                          onSlideChange={(swiper) => {
                            const current = images[swiper.activeIndex];
                            if (current && current.id !== selectedImage?.id) {
                              setSelectedImage(current);
                            }
                          }}
                          initialSlide={Math.max(
                            0,
                            images.findIndex(
                              (img) =>
                                img.id === (selectedImage?.id ?? mainImage?.id),
                            ),
                          )}
                          style={{ width: "100%" }}
                        >
                          {images.map((image) => (
                            <SwiperSlide key={image.id}>
                              <img
                                src={image.imageUrl}
                                alt={image.fileName}
                                style={{
                                  width: "100%",
                                  borderRadius: "5px",
                                  objectFit: "cover",
                                }}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : null}
                    </Box>

                    {/* Thumbnails horizontal swiper */}
                    <Box
                      sx={{
                        marginTop: 2,
                        width: "100%",
                      }}
                    >
                      {images.length ? (
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          direction="horizontal"
                          spaceBetween={12}
                          slidesPerView={4}
                          watchSlidesProgress
                          modules={[Thumbs]}
                          breakpoints={{
                            320: { slidesPerView: 3, spaceBetween: 8 },
                            480: { slidesPerView: 4, spaceBetween: 12 },
                            640: { slidesPerView: 5, spaceBetween: 12 },
                          }}
                        >
                          {images.map((image, index) => (
                            <SwiperSlide key={image.id}>
                              <Box
                                onClick={() =>
                                  mainSwiper && mainSwiper.slideTo(index)
                                }
                                sx={{
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  border:
                                    selectedImage?.id === image.id
                                      ? "2px solid black"
                                      : "1px solid #e0e0e0",
                                  borderRadius: "5px",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  src={image.imageUrl}
                                  alt={image.fileName}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundPosition: "center",
                                    objectFit: "cover",
                                  }}
                                />
                              </Box>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : null}
                    </Box>
                  </>
                </Grid>

                {/* Right panel - product details */}
                <Grid size={{ xl: 6, lg: 6, md: 6, sm: 6, xs: 12 }}>
                  {/* Product Title */}
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "1.4rem",
                        md: "1.6rem",
                      },
                    }}
                    fontWeight={"600"}
                  >
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
                        <Typography variant="body1" color="success">
                          Còn hàng: {availableStock} sản phẩm
                        </Typography>
                      ) : (
                        <Typography variant="body1" color="error">
                          Hết hàng
                        </Typography>
                      )}
                    </Box>
                  )}

                  <Typography mt={4} mb={2} variant="body1" fontSize={"1.1rem"}>
                    Màu sắc: {selectedColor?.name || "Chưa chọn"}
                  </Typography>
                  {sortedColors.map((color) => (
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
                        mt: 1,
                        borderColor:
                          selectedColor?.id === color.id ? "black" : "#ccc",
                      }}
                    >
                      {color.name}
                    </Button>
                  ))}

                  <Typography mt={4} mb={2} variant="body1" fontSize={"1.1rem"}>
                    Kích thước: {selectedSize?.name || "Chưa chọn"}
                  </Typography>
                  {sortedSizes.map((size) => (
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
                        mt: 1,
                        borderColor:
                          selectedSize?.id === size.id ? "black" : "#ccc",
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
                        p: 0,
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
                        p: 0,
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
                    <Typography variant="body2" color="warning" mb={2}>
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
            </Fragment>
          )}
        </Box>
      </Container>
    </Fragment>
  );
};

export default ProductDetails;
