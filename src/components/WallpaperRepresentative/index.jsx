/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
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
        backgroundSize: "100%"
      }}
    >
      <Box
        sx={{
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            color: "white",
            margin: 0,
          }}
        >
          {titleHeader}
        </h1>

        {searchSupport}
      </Box>
    </Box>
  );
};

export default WallpaperRepresentative;
