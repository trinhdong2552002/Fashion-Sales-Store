import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import ProductActions from "./shared/ProductActions";

import { useGetProductDetailByIdQuery } from "@/services/api/product";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [displayPrice, setDisplayPrice] = useState(0);

  const {
    data: dataProductById,
    isLoading: isLoadingProductById,
    isError: isErrorProductById,
    error: errorProductById,
    refetch: refetchProductById,
  } = useGetProductDetailByIdQuery(id);

  useEffect(() => {
    refetchProductById();
  }, [refetchProductById]);

  // Find current variant based on user's selection
  const currentVariant = dataProductById?.result?.variants?.find(
    (v) => v.color?.id === selectedColor?.id && v.size?.id === selectedSize?.id,
  );

  // If enough options are selected and a variant exists -> Get variant's data, otherwise get product's data
  const availableStock =
    selectedColor && selectedSize
      ? currentVariant?.quantity || 0
      : dataProductById?.result?.quantity || 0;

  const isVariantAvailable =
    selectedColor && selectedSize
      ? currentVariant?.isAvailable && currentVariant?.quantity > 0
      : dataProductById?.result?.isAvailable || false;

  const variants = dataProductById?.result?.variants || [];

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

  useEffect(() => {
    // If data is not loaded yet, do nothing
    if (!dataProductById?.result) return;

    const product = dataProductById.result;
    const variants = product.variants || [];

    // If not fully selected Color and Size -> Keep minPrice as main price
    if (!selectedColor || !selectedSize) {
      setDisplayPrice(product.minPrice || 0);
      return; // Stop the process here
    }

    // When User has selected BOTH Color and Size
    // Find the variant that matches the ID coordinates in the flat array
    const matchedVariant = variants.find(
      (v) => v.color?.id === selectedColor.id && v.size?.id === selectedSize.id,
    );

    if (matchedVariant) {
      if (matchedVariant.isAvailable && matchedVariant.quantity > 0) {
        // If variant is valid and in stock -> Set the actual price of that Variant
        setDisplayPrice(matchedVariant.price);
      } else {
        // Selected both but this pair is out of stock
        // Still use minPrice as the main price
        setDisplayPrice(product.minPrice || 0);
      }
    } else {
      // If no variant matches (Empty Matrix) -> Fallback to minPrice
      setDisplayPrice(product.minPrice || 0);
    }
  }, [selectedColor, selectedSize, dataProductById]);

  // Reset quantity when variant changes
  useEffect(() => {
    if (dataProductById) {
      // Reset to 1 or max available stock if current quantity exceeds it
      setQuantity((prevQuantity) => {
        if (prevQuantity > availableStock) {
          return Math.min(1, availableStock);
        }
        return prevQuantity;
      });
    }
  }, [dataProductById, availableStock]);

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

  // Get unique colors from variants
  const sortedColors = [];
  variants.forEach((v) => {
    if (v.color && !sortedColors.some((c) => c.id === v.color.id)) {
      sortedColors.push(v.color);
    }
  });
  // Sort by ID increasingly to keep the UI button order fixed
  sortedColors.sort((a, b) => a.id - b.id);

  // Filter unique sizes from variants
  const sortedSizes = [];
  variants.forEach((v) => {
    if (v.size && !sortedSizes.some((s) => s.id === v.size.id)) {
      sortedSizes.push(v.size);
    }
  });
  // Sort by ID increasingly to keep the UI button order fixed
  sortedSizes.sort((a, b) => a.id - b.id);

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
                          style={{
                            width: "100%",
                            "--swiper-navigation-color": "black",
                            "--swiper-navigation-size": "30px",
                          }}
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
                      {isLoadingProductById ? (
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
                    Màu sắc:{" "}
                    <strong>{selectedColor?.name || "Chưa chọn"}</strong>
                  </Typography>

                  {sortedColors.map((color) => {
                    // Check if this color has any variants in stock
                    const isColorInStock = variants.some(
                      (v) =>
                        v.color?.id === color.id &&
                        v.isAvailable &&
                        v.quantity > 0,
                    );

                    return (
                      <Button
                        key={color.id}
                        onClick={() => handleColorSelect(color)}
                        variant={
                          selectedColor?.id === color.id
                            ? "contained"
                            : "outlined"
                        }
                        disabled={!isColorInStock} // Disable button if this color is out of stock
                        sx={{
                          fontSize: "1rem",
                          mr: 1,
                          mt: 1,
                          textTransform: "none",
                          color:
                            selectedColor?.id === color.id ? "white" : "black",
                          backgroundColor:
                            selectedColor?.id === color.id
                              ? "black"
                              : "transparent",
                          borderColor:
                            selectedColor?.id === color.id ? "black" : "#ccc",
                          "&:hover": {
                            backgroundColor:
                              selectedColor?.id === color.id
                                ? "#222"
                                : "#f5f5f5",
                            borderColor: "black",
                          },
                        }}
                      >
                        {color.name}
                      </Button>
                    );
                  })}

                  <Typography mt={4} mb={2} variant="body1" fontSize={"1.1rem"}>
                    Kích thước: {selectedSize?.name || "Chưa chọn"}
                  </Typography>
                  {sortedSizes.map((size) => {
                    // ĐỈNH CAO UX: Check chéo xem size này còn hàng tương ứng với màu đang chọn hay không
                    const isSizeAvailable = variants.some((v) => {
                      if (selectedColor) {
                        return (
                          v.color?.id === selectedColor.id &&
                          v.size?.id === size.id &&
                          v.isAvailable &&
                          v.quantity > 0
                        );
                      }
                      return (
                        v.size?.id === size.id &&
                        v.isAvailable &&
                        v.quantity > 0
                      );
                    });

                    return (
                      <Button
                        key={size.id}
                        onClick={() => handleSizeSelect(size)}
                        variant={
                          selectedSize?.id === size.id
                            ? "contained"
                            : "outlined"
                        }
                        disabled={!isSizeAvailable} // Disabled button if this variant is out of stock
                        sx={{
                          fontSize: "1rem",
                          mr: 1,
                          mt: 1,
                          textTransform: "none",
                          color:
                            selectedSize?.id === size.id ? "white" : "black",
                          backgroundColor:
                            selectedSize?.id === size.id
                              ? "black"
                              : "transparent",
                          borderColor:
                            selectedSize?.id === size.id ? "black" : "#ccc",
                          "&:hover": {
                            backgroundColor:
                              selectedSize?.id === size.id ? "#222" : "#f5f5f5",
                            borderColor: "black",
                          },
                        }}
                      >
                        {size.name}
                      </Button>
                    );
                  })}
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
                    variantId={dataProductById?.result?.id}
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
