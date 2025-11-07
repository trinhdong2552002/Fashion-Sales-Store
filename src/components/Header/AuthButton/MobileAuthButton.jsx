import { ExpandMore, Logout, Person } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const MobileAuthButton = ({ handleLogout, myInfo, navigate }) => {
  console.log("myInfo in MobileAuthButton:", myInfo);

  return (
    <Fragment>
      {myInfo?.id ? (
        <Fragment>
          <Accordion
            elevation={0}
            disableGutters
            sx={{
              "&:before": {
                display: "none",
              },
              boxShadow: "none",
              mb: 2,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Person />

              <Typography variant="h4" fontSize={"1.1rem"} ml={1}>
                Trang cá nhân
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ padding: 0, mt: 1 }}>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  onClick={() =>
                    navigate(`/account-information/profile/${myInfo.id}`)
                  }
                  variant="body1"
                  ml={4}
                  p={1.5}
                  sx={{ cursor: "pointer" }}
                >
                  Thông tin tài khoản
                </Typography>
                <Typography
                  onClick={() => navigate("/my-order")}
                  variant="body1"
                  ml={4}
                  p={1.5}
                  sx={{ cursor: "pointer" }}
                >
                  Đơn hàng của tôi
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              my: 4,
              p: 0,
              color: "black",
              bgcolor: "white",
              borderColor: "#d9d9d9",
              height: 40,
              fontSize: "1rem",
            }}
          >
            <IconButton color="inherit" aria-label="logout">
              <Logout />
            </IconButton>

            <Typography variant="body1" onClick={handleLogout}>
              Đăng xuất
            </Typography>
          </Button>
        </Fragment>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"100%"}
          alignItems={"center"}
        >
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: "black",
              bgcolor: "white",
              borderColor: "#d9d9d9",
              height: 40,
              fontSize: "1rem",
            }}
            component={Link}
            to="/login"
          >
            Đăng nhập
          </Button>
          <Button
            fullWidth
            sx={{
              height: 40,
              fontSize: "1rem",
              mt: 2,
            }}
            component={Link}
            to="/register"
          >
            Đăng ký
          </Button>
        </Box>
      )}
    </Fragment>
  );
};

export default MobileAuthButton;
