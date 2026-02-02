import { useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser, selectUser } from "@/store/redux/user/reducer";
import { useLogoutMutation } from "@/services/api/auth";
import { clearAuth, selectAuth } from "@/store/redux/auth/reducer";
import DesktopAuthButton from "./DesktopAuthButton";
import MobileAuthButton from "./MobileAuthButton";
import { useSnackbar } from "@/components/Snackbar";

const AuthButton = ({ onCloseDrawer }) => {
  const { showSnackbar } = useSnackbar();
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const myInfo = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const accessToken = auth.accessToken;
      // TODO: Call logout API if accessToken exists
      if (accessToken) {
        try {
          await logout({ accessToken }).unwrap();
        } catch (err) {
          console.log("Logout failed", err);
        }
      }

      // TODO: Clear token local storage and Redux store
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(clearAuth());
      dispatch(clearUser());
      handleMenuClose();
      navigate("/");
    } catch (error) {
      if (error?.data?.message) {
        showSnackbar(error.data.message, "error");
      } else {
        showSnackbar("Đã có lỗi xảy ra trong quá trình đăng xuất.", "error");
      }
    }
  };

  return isMobile ? (
    <MobileAuthButton
      handleLogout={handleLogout}
      myInfo={myInfo}
      navigate={navigate}
      onCloseDrawer={onCloseDrawer}
    />
  ) : (
    <DesktopAuthButton
      handleMenuOpen={handleMenuOpen}
      handleLogout={handleLogout}
      myInfo={myInfo}
      anchorEl={anchorEl}
      handleMenuClose={handleMenuClose}
      navigate={navigate}
    />
  );
};

export default AuthButton;
