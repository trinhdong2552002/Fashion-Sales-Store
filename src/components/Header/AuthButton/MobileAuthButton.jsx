import { ExpandMore, Logout, Person } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const MobileAuthButton = ({
  handleLogout,
  myInfo,
  navigate,
  onCloseDrawer,
}) => {
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

            <AccordionDetails sx={{ p: 0, m: 0 }}>
              <AccordionSummary
                sx={{
                  "& .MuiAccordionSummary-content": {
                    mt: 0,
                  },
                }}
              >
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                  <Typography
                    onClick={() => {
                      navigate(`/account-information/profile/${myInfo.id}`);
                      onCloseDrawer?.();
                    }}
                    variant="body1"
                    ml={2}
                    p={1.5}
                    sx={{ cursor: "pointer" }}
                  >
                    Hồ sơ người dùng
                  </Typography>
                  <Typography
                    onClick={() => {
                      navigate(
                        `/account-information/change-password/${myInfo.id}`
                      );
                      onCloseDrawer?.();
                    }}
                    variant="body1"
                    ml={2}
                    p={1.5}
                    sx={{ cursor: "pointer" }}
                  >
                    Đổi mật khẩu
                  </Typography>
                  <Typography
                    onClick={() => {
                      navigate(`/account-information/address/${myInfo.id}`);
                      onCloseDrawer?.();
                    }}
                    variant="body1"
                    ml={2}
                    p={1.5}
                    sx={{ cursor: "pointer" }}
                  >
                    Địa chỉ
                  </Typography>
                  <Typography
                    onClick={() => {
                      navigate("/my-order");
                      onCloseDrawer?.();
                    }}
                    variant="body1"
                    ml={2}
                    p={1.5}
                    sx={{ cursor: "pointer" }}
                  >
                    Đơn hàng của tôi
                  </Typography>
                </Box>
              </AccordionSummary>
            </AccordionDetails>
          </Accordion>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              p: 0,
              color: "black",
              bgcolor: "white",
              borderColor: "#d9d9d9",
              height: 40,
              fontSize: "1rem",
            }}
          >
            <Logout />
            <Typography variant="body1" onClick={handleLogout} ml={1}>
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
            variant="contained"
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
