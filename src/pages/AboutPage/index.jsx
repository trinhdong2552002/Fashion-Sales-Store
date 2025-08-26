import styles from "./index.module.css";
import { Box, CircularProgress, Container, Grid, Stack } from "@mui/material";
import WallpaperRepresentative from "@/components/WallpaperRepresentative";
import { useGetListBranchesQuery } from "@/services/api/branches";
import { useEffect } from "react";

const contents = [
  {
    titleAboutUs: "Câu chuyện về chúng tôi",
    firstLineAboutUs:
      "Mọi chuyện bắt đầu vào năm 2025 khi người sáng lập của chúng tôi đã vật lộn để tìm quần áo giá cả phải chăng, chất lượng cao và bền vững. Chúng tôi nhận ra rằng hầu hết các thương hiệu thời trang đều tập trung vào phong cách hoặc tính bền vững—nhưng hiếm khi cả hai. Đó là lúc ý tưởng về Fashion Store ra đời: một thương hiệu kết hợp các thiết kế hợp thời trang với vật liệu thân thiện với môi trường.",
    secondLineAboutUs:
      "Ngày nay, Fashion Store hợp tác với các nhà sản xuất và hỗ trợ các hoạt động thương mại công bằng để mang đến thời trang bền vững, phong cách cho những người tiêu dùng trên toàn thế giới.",
    thirdLineAboutUs:
      "Bạn có thắc mắc gì không? Hãy ghé qua tại các chi nhánh sau:",
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
  const {
    data: dataBranches,
    isLoading: isLoadingBranch,
    error: isErrorBranch,
    refetch: refetchBranch,
  } = useGetListBranchesQuery({
    refetchOnMountOrArgChange: true,
  });
  console.log("dataBranches", dataBranches);

  useEffect(() => {
    refetchBranch();
  }, [refetchBranch]);

  if (isLoadingBranch)
    return (
      <Box display={"flex"}>
        <CircularProgress />
        <p>Đang tải...</p>
      </Box>
    );
  if (isErrorBranch)
    return <div style={{ color: "red" }}>Lỗi tải branches...</div>;

  return (
    <section>
      <WallpaperRepresentative titleHeader="Về chúng tôi" />
      <Container maxWidth="lg">
        <Grid container sx={{ m: "80px 0" }} alignItems={"center"}>
          <Grid size={{ lg: 8, md: 8, sm: 12 }}>
            {contents.map((content, index) => (
              <Stack sx={{ marginRight: 8 }} key={index}>
                <h2 style={{ fontSize: "2rem", fontWeight: "500" }}>
                  {content.titleAboutUs}
                </h2>
                <p className={styles.content}>{content.firstLineAboutUs}</p>
                <p className={styles.content}>{content.secondLineAboutUs}</p>
                <p className={styles.content}>{content.thirdLineAboutUs}</p>
              </Stack>
            ))}
            {dataBranches && (
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
            )}
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
              <Stack sx={{ marginLeft: 8 }} key={index}>
                <h2 style={{ fontSize: "2rem", fontWeight: "500", margin: 0 }}>
                  {content.titleMissionUs}
                </h2>
                <p className={styles.content}>{content.firstLineMissionUs}</p>
                <p className={styles.content}>{content.secondLineMissionUs}</p>
                <p className={styles.content}>{content.thirdLineMissionUs}</p>
              </Stack>
            ))}
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default About;
