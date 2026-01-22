import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useListCategoriesForUserQuery } from "@/services/api/categories";
import BrandVideo from "./shared/BrandVideo";
import styles from "./index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import SwiperProducts from "@/components/SwiperProducts";
import { slugify } from "@/utils/slugify";
import banner_1 from "@/assets/images/banner/banner-1.jpg";
import banner_2 from "@/assets/images/banner/banner-2.jpg";
import banner_3 from "@/assets/images/banner/banner-3.jpg";
import banner_4 from "@/assets/images/banner/banner-4.jpg";
import T_Shirt from "@/assets/images/categories/T-shirt.jpg";
import Shirt from "@/assets/images/categories/Shirt.jpg";
import Jacket from "@/assets/images/categories/Jacket.jpg";
import Trouser from "@/assets/images/categories/Trouser.jpg";
import Shorts from "@/assets/images/categories/Shorts.jpg";
import Accessories from "@/assets/images/categories/Accessories.jpg";

const slides = [banner_1, banner_2, banner_3, banner_4];

const categoryImageMap = {
  "Áo thun": T_Shirt,
  "Áo sơ mi": Shirt,
  "Áo khoác": Jacket,
  "Quần tây": Trouser,
  "Quần shorts": Shorts,
  "Phụ kiện": Accessories,
};

const Home = () => {
  const { data: dataCategories, refetch: refetchCategories } =
    useListCategoriesForUserQuery({
      pageNo: 1,
      pageSize: 10,
    });

  useEffect(() => {
    refetchCategories();
  }, []);

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
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              className={styles.banner}
              src={slide}
              alt={`Slide ${index + 1}`}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Box
        textAlign={"center"}
        my={10}
        py={10}
        px={{
          xs: 2,
          md: 0,
        }}
        bgcolor={"#f9f9f9"}
      >
        <Typography
          mb={2}
          fontWeight={"bold"}
          variant="h4"
          fontSize={{
            xl: "1.6rem",
            lg: "1.6rem",
            md: "1.4rem",
            sm: "1.2rem",
            xs: "1.2rem",
          }}
        >
          Hãy tận hưởng tuổi trẻ của bạn!
        </Typography>
        <Typography
          variant="body1"
          fontSize={{
            xs: "1rem",
            sm: "1rem",
            md: "1.2rem",
          }}
          maxWidth={"800px"}
          m={"auto"}
          color="#666"
        >
          Fashion Store là nơi cung cấp thời trang hiện đại dành cho giới trẻ,
          mang đến trải nghiệm mua sắm tiện lợi và phong cách nổi bật mỗi ngày.
        </Typography>
      </Box>

      <Container maxWidth="xl">
        <Typography
          fontSize={{
            xl: "1.8rem",
            lg: "1.8rem",
            md: "1.8rem",
            sm: "1.2rem",
            xs: "1.2rem",
          }}
          fontWeight={"bold"}
          variant="h4"
        >
          Danh mục sản phẩm
        </Typography>

        <Grid container spacing={12}>
          {activeCategories.map((item) => (
            <Grid
              my={6}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              size={{ xl: 4, lg: 4, sm: 6, xs: 12 }}
              key={item.id}
            >
              <Link
                to={{
                  pathname: "/all-products",
                  search: `?category=${slugify(item.name)}`,
                }}
              >
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
                    <Typography fontSize={"1.8rem"} color="white">
                      {item.name}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Product newest */}
      <SwiperProducts title="Sản phẩm mới nhất" type="newest" />

      {/* Brand video */}
      <BrandVideo />

      {/* Product best seller */}
      <SwiperProducts title="Sản phẩm bán chạy" type="bestSeller" />
    </Box>
  );
};

export default Home;
