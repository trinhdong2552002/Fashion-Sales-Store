import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Alert, Container, Grid, Snackbar, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useListCategoriesForUserQuery } from "@/services/api/categories";
import BrandVideo from "./shared/BrandVideo";
import styles from "./index.module.css";
import "swiper/css";
import "swiper/css/navigation";
import SwiperProducts from "@/components/SwiperProducts";

const slides = [
  "/src/assets/images/background-fashions/banner-fashion.jpg",
  "/src/assets/images/background-fashions/banner-fashion-1.jpg",
  "/src/assets/images/background-fashions/banner-fashion-2.jpg",
  "/src/assets/images/background-fashions/banner-fashion-3.jpg",
  "/src/assets/images/background-fashions/banner-fashion-4.jpg",
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
  const { data, isFetching } = useListCategoriesForUserQuery({
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

  const activeCategories = Array.isArray(data)
    ? data.filter((item) => item.status === "ACTIVE")
    : [];

  if (isFetching || !data) return null;

  return (
    <section>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        // style={{ width: "100%", color: "#fff" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              style={{ width: "100%", height: 900, objectFit: "cover" }}
              src={slide}
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        style={{
          textAlign: "center",
          margin: "100px 0",
          padding: "100px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "24px" }}>
          Hãy tận hưởng tuổi trẻ của bạn!
        </h2>
        <p
          style={{
            maxWidth: "600px",
            margin: "auto",
            color: "var(--text-color)",
          }}
        >
          Fashion Store là nơi cung cấp thời trang hiện đại dành cho giới trẻ,
          mang đến trải nghiệm mua sắm tiện lợi và phong cách nổi bật mỗi ngày.
        </p>
      </div>

      <Container maxWidth="lg">
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
                <Stack className={styles.wrapperImg}>
                  <img
                    className={styles.mediaImg}
                    src={
                      categoryImageMap[item.name] ||
                      "/src/assets/images/categories/default.jpg"
                    }
                    alt={item.name}
                  />
                  <Stack className={styles.contentImg}>
                    <h2
                      style={{ fontSize: 32, fontWeight: 500, color: "white" }}
                    >
                      {item.name}
                    </h2>
                  </Stack>
                </Stack>
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
    </section>
  );
};

export default Home;
