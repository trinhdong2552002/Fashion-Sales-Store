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

const navCategories = [{ title: "Sản phẩm bán chạy", showButton: true }];

const SwiperProducts = () => {
  const navigate = useNavigate();

  const {
    data: dataProducts,
    isLoading: isLoadingProduct,
    isError,
    error,
    refetch: refetchProduct,
  } = useListProductsForUserQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetchProduct();
  }, [refetchProduct]);

  const activeProducts = Array.isArray(dataProducts?.result?.items)
    ? dataProducts.result.items.filter((item) => item.status === "ACTIVE")
    : [];

  const handleClick = () => {
    navigate("/list-products");
  };

  return (
    <Container maxWidth="xl">
      {navCategories.map((category, index) => (
        <Box key={index} sx={{ my: 6 }}>
          <Box
            display={"flex"}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography color="info" fontWeight={600} variant="h4">
              {category.title}
            </Typography>

            {category.showButton && (
              <Box display={"flex"} alignItems="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    mr: 2.5,
                  }}
                  onClick={handleClick}
                >
                  Xem tất cả
                </Button>
              </Box>
            )}
          </Box>

          {/* Swiper Products */}

          {isError ? (
            <Typography color="error" variant="h6">
              Không thể tải sản phẩm. Vui lòng thử lại sau.
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
              <Typography textAlign="center" variant="h6">
                Đang tải sản phẩm...
              </Typography>
            </Box>
          ) : dataProducts ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
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
                marginBottom: "20px",
                backgroundColor: "#f5f5f5",
                padding: "20px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {activeProducts.map((product) => (
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
                    }}
                  >
                    <CardActionArea sx={{ flexGrow: 1 }}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={
                          product.images?.length > 0
                            ? product.images[0].imageUrl
                            : ""
                        }
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
                          sx={{
                            mt: 1,
                            fontWeight: "bold",
                            color: "primary.main",
                          }}
                        >
                          {product.price?.toLocaleString("vi-VN")}đ
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </Box>
      ))}
    </Container>
  );
};

export default SwiperProducts;
