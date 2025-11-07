import { Box, Typography } from "@mui/material";
import backgroundFashion from "@/assets/images/background-fashions/background-fashion.png";

const WallpaperRepresentative = ({ titleHeader, searchSupport }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "500px",
        backgroundImage: `url(${backgroundFashion})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        width={"100%"}
        sx={{
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xl: "2.5rem",
              lg: "2.5rem",
              md: "2rem",
              sm: "1.8rem",
              xs: "1.5rem",
            },
            fontWeight: "bold",
            color: "white",
            margin: 0,
          }}
        >
          {titleHeader}
        </Typography>

        {searchSupport}
      </Box>
    </Box>
  );
};

export default WallpaperRepresentative;