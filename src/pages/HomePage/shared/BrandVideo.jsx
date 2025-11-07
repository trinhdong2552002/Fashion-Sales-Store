import { Container, Typography, Box, CardMedia } from "@mui/material";
import introducingVideo from "@/assets/videos/introducing-fashion.mp4";

const BrandVideo = () => {
  return (
    <Box
      component={"section"}
      py={10}
      sx={{
        backgroundColor: "#f9f9f9",
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography
            mb={2}
            fontWeight={"bold"}
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
          >
            Khám phá Fashion Store
          </Typography>
          <Typography
            variant="body1"
            color="#666"
            sx={{
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
                md: "1.2rem",
              },
            }}
          >
            Hành trình sáng tạo & định hình phong cách thời trang hiện đại.
          </Typography>
        </Box>

        <CardMedia
          component="video"
          image={introducingVideo}
          title="Fashion Store Introduction"
          autoPlay
          muted
          loop
        />
      </Container>
    </Box>
  );
};

export default BrandVideo;
