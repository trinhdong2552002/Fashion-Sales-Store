import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingItem = ({ title }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height="100vh"
    >
      <CircularProgress color="inherit" aria-label="Loading…" />
      <Typography
        mt={3}
        variant="h6"
        color="#666"
        fontSize={{
          xl: "1.1rem",
          lg: "1.1rem",
          md: "1.1rem",
          sm: "1rem",
          xs: "1rem",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default LoadingItem;
