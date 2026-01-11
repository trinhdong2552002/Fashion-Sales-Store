import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useListProductsForUserQuery } from "@/services/api/product";
import { useEffect } from "react";
import { KeyboardArrowRight } from "@mui/icons-material";

const SwiperProducts = ({ title, type }) => {
  const navigate = useNavigate();

  const {
    data: dataProducts,
    isLoading: isLoadingProduct,
    isError,
    error,
    refetch: refetchProduct,
  } = useListProductsForUserQuery({
    pageNo: 1,
    pageSize: 20,
  });

  useEffect(() => {
    refetchProduct();
  }, []);

  let products =
    dataProducts?.items.filter((item) => item.status === "ACTIVE") || [];

  // Filter theo type
  if (type === "newest") {
    products = [...products].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (type === "bestSeller") {
    products = [...products].sort((a, b) => b.soldQuantity - a.soldQuantity);
  }

  const handleClick = () => {
    navigate("/all-products");
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          my: 6,
          mx: {
            md: 1,
            xs: 1,
            sm: 1,
          },
        }}
      >
        <Box
          display={"flex"}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xl: "1.6rem",
                lg: "1.6rem",
                md: "1.4rem",
                sm: "1.2rem",
                xs: "1.2rem",
              },
            }}
            fontWeight={"bold"}
          >
            {title}
          </Typography>

          <Button
            variant="contained"
            endIcon={<KeyboardArrowRight />}
            sx={{
              backgroundColor: "#121212",
              fontSize: {
                xl: "1.1rem",
                lg: "1.1rem",
                md: "1.1rem",
                sm: "1rem",
                xs: "0.9rem",
              },
              display: {
                xs: "none",
                sm: "inline-flex",
                md: "inline-flex",
              },
            }}
            onClick={handleClick}
          >
            Xem tất cả
          </Button>
        </Box>

        {/* Swiper Products */}

        {isError ? (
          <Typography color="error" variant="h6">
            {/* Không thể tải sản phẩm. Vui lòng thử lại sau. */}
            {error.message}
          </Typography>
        ) : isLoadingProduct ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress />
            <Typography mt={2} textAlign="center" variant="h6">
              Đang tải sản phẩm...
            </Typography>
          </Box>
        ) : dataProducts ? (
          <Swiper
            breakpoints={{
              // When window width is >= 640px
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              // When window width is >= 768px
              900: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              // When window width is >= 1024px
              1200: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
              1536: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay]}
            className="mySwiper"
            style={{
              minHeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {products.map((product) => {
              const mainImage =
                product.images && product.images.length > 0
                  ? [...product.images].sort((a, b) => a.id - b.id)[0]
                  : null;

              return (
                <SwiperSlide key={product.id}>
                  <Card
                    onClick={() => navigate(`/product-details/${product.id}`)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        boxShadow: 6,
                        transform: "translateY(-2px)",
                        transition: "all 0.3s ease",
                      },
                      mx: {
                        xs: 2,
                        sm: 0,
                        md: 0,
                        lg: 0,
                        xl: 0,
                      },
                    }}
                  >
                    <CardActionArea sx={{ flexGrow: 1 }}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={mainImage ? mainImage.imageUrl : ""}
                        alt={product.name}
                        sx={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                      <CardContent>
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          sx={{
                            textAlign: "center",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            minHeight: "3rem",
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          textAlign="center"
                          mt={1}
                          fontWeight={"bold"}
                        >
                          {product.price?.toLocaleString("vi-VN")}đ
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : null}

        <Box display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            endIcon={<KeyboardArrowRight />}
            sx={{
              backgroundColor: "#121212",
              fontSize: {
                xl: "1.1rem",
                lg: "1.1rem",
                md: "1.1rem",
                sm: "1rem",
                xs: "0.9rem",
              },
              display: {
                xs: "inline-flex",
                sm: "none",
                md: "none",
              },
            }}
            onClick={handleClick}
          >
            Xem tất cả
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SwiperProducts;
