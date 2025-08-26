import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { useListProductsForUserQuery } from "@/services/api/product";

const navCategories = [{ title: "Sản phẩm bán chạy", showButton: true }];

const SwiperProducts = () => {
  const navigate = useNavigate();

  const { data: dataProducts, isLoading: isProductsLoading } =
    useListProductsForUserQuery({
      refetchOnMountOrArgChange: true,
      forceRefetch: true,
    });

  const handleClick = () => {
    navigate("/list-products");
  };

  const activeProducts = Array.isArray(dataProducts?.result?.items)
    ? dataProducts.result.items.filter((item) => item.status === "ACTIVE")
    : [];

  return (
    <>
      {navCategories.map((category, index) => (
        <Box key={index} sx={{ mb: 6 }}>
          {/* Section Title + Categories */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography variant="h5" fontWeight="bold" ml={2.5}>
              {category.title}
            </Typography>

            {/* See More Button */}
            {category.showButton && (
              <Stack alignItems="center">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    mr: 2.5
                  }}
                  onClick={handleClick}
                >
                  Xem tất cả
                </Button>
              </Stack>
            )}
          </Stack>

          {/* Swiper Products */}
          <Swiper
            loop={false}
            slidesPerView={5}
            slidesPerGroup={1}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            navigation
            pagination
            modules={[Autoplay, Pagination, Navigation]}
            style={{
              "--swiper-navigation-color": "#555",
              minHeight: 500,
              marginBottom: "20px",
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            {isProductsLoading ? (
              <SwiperSlide>
                <Typography textAlign="center">Đang tải sản phẩm...</Typography>
              </SwiperSlide>
            ) : activeProducts.length === 0 ? (
              <SwiperSlide>
                <Typography textAlign="center">
                  Không có sản phẩm để hiển thị
                </Typography>
              </SwiperSlide>
            ) : (
              activeProducts.map((product) => {
                return (
                  <SwiperSlide key={product.id}>
                    <Card
                      onClick={() => navigate(`/productDetails/${product.id}`)}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: 6,
                          transform: "translateY(-4px)",
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
                          loading="lazy"
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
                );
              })
            )}
          </Swiper>
        </Box>
      ))}
    </>
  );
};

export default SwiperProducts;
