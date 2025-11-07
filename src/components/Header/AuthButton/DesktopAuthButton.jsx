import {
  Stack,
  Typography,
  Menu,
  MenuItem,
  alpha,
  Button,
  Avatar,
  Divider,
  Box,
} from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const DesktopAuthButton = ({
  handleMenuOpen,
  handleLogout,
  myInfo,
  anchorEl,
  handleMenuClose,
  navigate,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      {myInfo?.id ? (
        <Fragment>
          <Stack
            direction="row"
            alignItems="center"
            onClick={handleMenuOpen}
            sx={{ cursor: "pointer" }}
          >
            <Avatar src={myInfo.avatarUrl} alt={myInfo.name} />
            <Typography ml={1}>{myInfo.name}</Typography>
          </Stack>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() =>
                navigate(`/account-information/profile/${myInfo.id}`)
              }
            >
              Thông tin tài khoản
            </MenuItem>
            <MenuItem onClick={() => navigate("/my-order")}>
              Đơn hàng của tôi
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Fragment>
      ) : (
        <Box display={"flex"} alignItems={"center"}>
          <Button
            variant="outlined"
            sx={{
              color: "black",
              backgroundColor: "white",
              borderColor: "#d9d9d9",
              borderRadius: 5,
              minWidth: 120,
              height: 40,
              textTransform: "none",
              fontSize: "1rem",
              mr: 1,
              "&:hover": {
                backgroundColor: alpha("#d9d9d9", 0.5),
              },
            }}
            component={Link}
            to="/login"
          >
            Đăng nhập
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#121212",
              borderRadius: 5,
              minWidth: 120,
              height: 40,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: alpha("#333"),
              },
            }}
            component={Link}
            to="/register"
          >
            Đăng ký
          </Button>
        </Box>
      )}
    </Stack>
  );
};
export default DesktopAuthButton;
