import {
  Alert,
  Box,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useListCategoriesForUserQuery } from "@/services/api/categories";
import BrandVideo from "./shared/BrandVideo";
import styles from "./index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import SwiperProducts from "@/components/SwiperProducts";

const slides = [
  "/src/assets/images/banner/banner-1.jpg",
  "/src/assets/images/banner/banner-2.jpg",
  "/src/assets/images/banner/banner-3.jpg",
  "/src/assets/images/banner/banner-4.jpg",
];

const categoryImageMap = {
  "Áo thun": "/src/assets/images/categories/T-shirt.jpg",
  "Áo sơ mi": "/src/assets/images/categories/Shirt.jpg",
  "Áo khoác": "/src/assets/images/categories/Jacket.jpg",
  "Quần dài": "/src/assets/images/categories/Trouser.jpg",
  "Quần shorts": "/src/assets/images/categories/Shorts.jpg",
  "Phụ kiện": "/src/assets/images/categories/Accessories.jpg",
};

const Home = () => {
  const location = useLocation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { data: dataCategories, isFetching } = useListCategoriesForUserQuery({
    page: 0,
    size: 10,
    refetchOnMountOrArgChange: true,
    forceRefetch: true,
  });

  useEffect(() => {
    if (location.state?.message) {
      setSnackbar({
        open: true,
        message: location.state.message || "",
        severity: location.state.severity || "success",
      });
    }
    window.history.replaceState({}, document.title);
  }, [location]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const activeCategories = Array.isArray(dataCategories)
    ? dataCategories.filter((item) => item.status === "ACTIVE")
    : [];

  return (
    <Box component={"section"}>
      <Swiper
        slidesPerView={1}
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
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              style={{ width: "100%", height: 800, objectFit: "cover" }}
              src={slide}
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Box
        textAlign={"center"}
        my={10}
        p={10}
        sx={{
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography color="info" mb={4} fontWeight={600} variant="h4">
          Hãy tận hưởng tuổi trẻ của bạn!
        </Typography>
        <Typography
          component={"p"}
          sx={{
            fontSize: "1.2rem",
            maxWidth: "800px",
            margin: "auto",
          }}
        >
          Fashion Store là nơi cung cấp thời trang hiện đại dành cho giới trẻ,
          mang đến trải nghiệm mua sắm tiện lợi và phong cách nổi bật mỗi ngày.
        </Typography>
      </Box>

      <Container maxWidth="xl">
        <Typography color="info" fontWeight={600} variant="h4">
          Danh mục sản phẩm
        </Typography>

        <Grid container spacing={12}>
          {activeCategories.map((item) => (
            <Grid
              sx={{
                marginTop: 6,
                marginBottom: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              size={{ xl: 4, lg: 4, sm: 6, xs: 12 }}
              key={item.id}
            >
              <Link to="/list-products">
                <Box className={styles.wrapperImg}>
                  <img
                    className={styles.mediaImg}
                    src={
                      categoryImageMap[item.name] ||
                      "/src/assets/images/categories/default.jpg"
                    }
                    alt={item.name}
                  />
                  <Box className={styles.contentImg}>
                    <h2
                      style={{ fontSize: 32, fontWeight: 500, color: "white" }}
                    >
                      {item.name}
                    </h2>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
      <SwiperProducts />
      <BrandVideo />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "right", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", p: "10px 20px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
