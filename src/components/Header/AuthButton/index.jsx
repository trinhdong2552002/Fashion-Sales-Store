import {
  Stack,
  Typography,
  Menu,
  MenuItem,
  alpha,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, selectUser } from "@/store/redux/user/reducer";
import { useLogoutMutation } from "@/services/api/auth";
import { clearAuth, selectAuth } from "@/store/redux/auth/reducer";

const AuthButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const myInfo = useSelector(selectUser);
  console.log("myInfo", myInfo);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          await logout({ accessToken }).unwrap();
        } catch (err) {
          console.log("Logout failed", err);
        }
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(clearAuth());
      dispatch(clearUser());
      handleMenuClose();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Stack direction="row" alignItems="center">
      {myInfo?.id ? (
        <>
          <Stack
            direction="row"
            alignItems="center"
            onClick={handleMenuOpen}
            sx={{ cursor: "pointer" }}
          >
            <Avatar src={myInfo.avatarUrl} alt={myInfo.name} />
            {/* <Avatar /> */}
            <Typography sx={{ marginLeft: "5px" }}>
              {myInfo.name}
            </Typography>
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
        </>
      ) : (
        <Stack
          direction={"row"}
          spacing={2}
          display={"flex"}
          alignItems={"center"}
        >
          <Button
            variant="outlined"
            sx={{
              color: "black",
              borderColor: "#d9d9d9",
              borderRadius: 5,
              width: 125,
              height: 40,
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
              backgroundColor: "black",
              borderRadius: 5,
              width: 125,
              height: 40,
              "&:hover": {
                backgroundColor: alpha("#333"),
              },
            }}
            component={Link}
            to="/register"
          >
            Đăng ký
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default AuthButton;
