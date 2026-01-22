import styles from "./index.module.css";
import { Box, Container, Grid, Typography } from "@mui/material";
import WallpaperRepresentative from "@/components/WallpaperRepresentative";
import { Fragment, useEffect } from "react";
import our_story from "@/assets/images/about-us/our-story.jpg";
import our_mission from "@/assets/images/about-us/our-mission.jpg";

const contents = [
  {
    id: 1,
    titleAboutUs: "Câu chuyện về chúng tôi",
    firstLineAboutUs:
      "Mọi chuyện bắt đầu vào năm 2025 khi người sáng lập của chúng tôi đã vật lộn để tìm quần áo giá cả phải chăng, chất lượng cao và bền vững. Chúng tôi nhận ra rằng hầu hết các thương hiệu thời trang đều tập trung vào phong cách hoặc tính bền vững. Đó là lúc ý tưởng về Fashion Store ra đời một thương hiệu kết hợp các thiết kế hợp thời trang với vật liệu thân thiện với môi trường.",
    secondLineAboutUs:
      "Ngày nay, Fashion Store hợp tác với các nhà sản xuất và hỗ trợ các hoạt động thương mại công bằng để mang đến thời trang bền vững, phong cách cho những người tiêu dùng trên toàn thế giới.",
  },
  {
    id: 2,
    titleMissionUs: "Nhiệm vụ của chúng tôi",
    firstLineMissionUs:
      "Tại Fashion Store, sứ mệnh của chúng tôi rất đơn giản: định nghĩa lại thời trang bằng cách biến tính bền vững thành tiêu chuẩn mới.",

    secondLineMissionUs:
      "Đó là lý do tại sao chúng tôi tạo ra quần áo thân thiện với môi trường, được sản xuất mà không ảnh hưởng đến chất lượng hoặc phong cách.",

    thirdLineMissionUs:
      "Thông qua nguồn cung ứng có trách nhiệm, mức lương công bằng cho người lao động và bao bì không chứa nhựa, chúng tôi hướng đến mục tiêu tạo ra tác động tích cực đến cả con người và môi trường. Cùng nhau, chúng ta có thể xây dựng một tương lai nơi thời trang không chỉ đẹp mà còn tử tế với thế giới.",
  },
];

const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // Accessing an object by its index in the array
  const storyContent = contents[0];
  const missionContent = contents[1];

  return (
    <Fragment>
      <WallpaperRepresentative titleHeader="Về chúng tôi" />
      <Container maxWidth="xl">
        {/*  SECTION 1: OUR STORY  */}
        <Grid
          container
          my={{
            md: 6,
            sm: 4,
            xs: 4,
          }}
          alignItems={"center"}
        >
          <Grid size={{ lg: 8, md: 8, sm: 8, xs: 12 }}>
            <Box mr={{ xl: 8, lg: 8, md: 4, sm: 4, xs: 0 }}>
              <Typography
                component="span"
                display="block"
                my={2}
                fontWeight={"bold"}
                variant="h4"
                fontSize={{
                  xl: "1.6rem",
                  lg: "1.6rem",
                  md: "1.4rem",
                  sm: "1.2rem",
                  xs: "1.2rem",
                }}
                textAlign={{
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "left",
                  xl: "left",
                }}
              >
                {storyContent.titleAboutUs}
              </Typography>
              <Typography
                component="span"
                display="block"
                mb={3}
                variant="body1"
                fontSize={{ xs: "1rem", sm: "1rem", md: "1.1rem" }}
                textAlign={{
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "left",
                  xl: "left",
                }}
                color="#666"
              >
                {storyContent.firstLineAboutUs}
                <Box mt={2} />
                {storyContent.secondLineAboutUs}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ lg: 4, md: 4, sm: 4, xs: 12 }}>
            <Box className={styles.contentImg}>
              <img src={our_story} alt="Our Story" />
            </Box>
          </Grid>
        </Grid>

        {/*  SECTION 2: OUR MISSION  */}
        <Grid container alignItems={"center"}>
          <Grid
            size={{ xl: 4, lg: 4, md: 4, sm: 4, xs: 12 }}
            sx={{ order: { md: 1, xs: 2, sm: 1 } }}
          >
            <Box className={styles.contentImg}>
              <img src={our_mission} alt="Our Mission" />
            </Box>
          </Grid>

          <Grid
            size={{ xl: 8, lg: 8, md: 8, sm: 8, xs: 12 }}
            sx={{ order: { xs: 1, md: 2 } }}
          >
            <Box ml={{ xl: 8, lg: 8, md: 4, sm: 4, xs: 0 }}>
              <Typography
                component="span"
                display="block"
                my={2}
                fontWeight={"bold"}
                variant="h4"
                fontSize={{
                  xl: "1.6rem",
                  lg: "1.6rem",
                  md: "1.4rem",
                  sm: "1.2rem",
                  xs: "1.2rem",
                }}
                textAlign={{
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "left",
                  xl: "left",
                }}
              >
                {missionContent.titleMissionUs}
              </Typography>
              <Typography
                component="span"
                display="block"
                mb={3}
                variant="body1"
                fontSize={{ xs: "1rem", sm: "1rem", md: "1.1rem" }}
                textAlign={{
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "left",
                  xl: "left",
                }}
                color="#666"
              >
                {missionContent.firstLineMissionUs}
                <Box mt={2} />
                {missionContent.secondLineMissionUs}
                <Box mt={2} />
                {missionContent.thirdLineMissionUs}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default About;
