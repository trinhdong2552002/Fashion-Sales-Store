import { Container, Typography, Box, CardMedia } from "@mui/material";

const BrandVideo = () => {
  return (
    <Box
      component={"section"}
      p={10}
      sx={{
        backgroundColor: "#f9f9f9",
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={4}>
          <Typography color="info" mb={4} fontWeight={600} variant="h4">
            Khám phá Fashion Store
          </Typography>
          <Typography
            component={"p"}
            sx={{
              fontSize: "1.2rem",
              maxWidth: "800px",
              margin: "auto",
            }}
          >
            Hành trình sáng tạo & định hình phong cách thời trang hiện đại.
          </Typography>
        </Box>

        <CardMedia
          component="video"
          image="/src/assets/videos/introducing-fashion.mp4"
          title="title"
          controls
          autoPlay
          muted
        />
      </Container>
    </Box>
  );
};

export default BrandVideo;
