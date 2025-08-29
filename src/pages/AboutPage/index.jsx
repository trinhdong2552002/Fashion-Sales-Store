import styles from "./index.module.css";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import WallpaperRepresentative from "@/components/WallpaperRepresentative";
import { useGetListBranchesQuery } from "@/services/api/branches";
import { useEffect } from "react";

const contents = [
  {
    titleAboutUs: "Câu chuyện về chúng tôi",
    firstLineAboutUs:
      "Mọi chuyện bắt đầu vào năm 2025 khi người sáng lập của chúng tôi đã vật lộn để tìm quần áo giá cả phải chăng, chất lượng cao và bền vững. Chúng tôi nhận ra rằng hầu hết các thương hiệu thời trang đều tập trung vào phong cách hoặc tính bền vững. Đó là lúc ý tưởng về Fashion Store ra đời một thương hiệu kết hợp các thiết kế hợp thời trang với vật liệu thân thiện với môi trường.",
    secondLineAboutUs:
      "Ngày nay, Fashion Store hợp tác với các nhà sản xuất và hỗ trợ các hoạt động thương mại công bằng để mang đến thời trang bền vững, phong cách cho những người tiêu dùng trên toàn thế giới.",
  },
  {
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
  // const {
  //   data: dataBranches,
  //   isLoading: isLoadingBranch,
  //   error: isErrorBranch,
  //   refetch: refetchBranch,
  // } = useGetListBranchesQuery({
  //   refetchOnMountOrArgChange: true,
  // });
  // console.log("dataBranches", dataBranches);

  // useEffect(() => {
  //   refetchBranch();
  // }, [refetchBranch]);

  // if (isLoadingBranch)
  //   return (
  //     <Box display={"flex"}>
  //       <CircularProgress />
  //       <p>Đang tải...</p>
  //     </Box>
  //   );
  // if (isErrorBranch)
  //   return <div style={{ color: "red" }}>Lỗi tải branches...</div>;

  return (
    <Box component={"section"}>
      <WallpaperRepresentative titleHeader="About us" />
      <Container maxWidth="xl">
        <Grid container sx={{ m: "80px 0" }} alignItems={"center"}>
          <Grid size={{ lg: 8, md: 8, sm: 12 }}>
            {contents.map((content, index) => (
              <Box mr={8} key={index}>
                <Typography color="info" mb={4} fontWeight={600} variant="h4">
                  {content.titleAboutUs}
                </Typography>
                <Typography component={"p"} mb={3} fontSize={"1.2rem"}>
                  {content.firstLineAboutUs}
                </Typography>
                <Typography component={"p"} mb={3} fontSize={"1.2rem"}>
                  {content.secondLineAboutUs}
                </Typography>
                <Typography component={"p"} mb={3} fontSize={"1.2rem"}>
                  {content.thirdLineAboutUs}
                </Typography>
              </Box>
            ))}
            {/* {dataBranches && (
              <Stack sx={{ marginRight: 8 }}>
                <ul>
                  {dataBranches?.result?.items.map((branch) => (
                    <li
                      key={branch.id}
                      style={{ margin: "10px 0", color: "var(--text-color)" }}
                    >
                      {branch.name} - {branch.location} (Số điện thoại:{" "}
                      {branch.phone})
                    </li>
                  ))}
                </ul>
              </Stack>
            )} */}
          </Grid>

          <Grid size={{ lg: 4, md: 4, sm: 12 }}>
            <Stack className={styles.contentImg}>
              <img
                src="/src/assets/images/about-us/our-story.jpg"
                alt="Our Story"
              />
            </Stack>
          </Grid>
        </Grid>

        <Grid container sx={{ m: "80px 0" }} alignItems={"center"}>
          <Grid size={{ lg: 4 }}>
            <Stack className={styles.contentImg}>
              <img
                src="/src/assets/images/about-us/our-mission.jpg"
                alt="Our Mission"
              />
            </Stack>
          </Grid>

          <Grid size={{ lg: 8 }}>
            {contents.map((content, index) => (
              <Box ml={8} key={index}>
                <Typography color="info" mb={4} fontWeight={600} variant="h4">
                  {content.titleMissionUs}
                </Typography>
                <Typography component={"p"} mb={3} fontSize={"1.2rem"}>
                  {content.firstLineMissionUs}
                </Typography>
                <Typography component={"p"} mb={3} fontSize={"1.2rem"}>
                  {content.secondLineMissionUs}
                </Typography>
                <Typography component={"p"} mb={3} fontSize={"1.2rem"}>
                  {content.thirdLineMissionUs}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
