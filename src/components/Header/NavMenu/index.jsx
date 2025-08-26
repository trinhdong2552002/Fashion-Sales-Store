import ContactsIcon from "@mui/icons-material/Contacts";
import HelpIcon from "@mui/icons-material/Help";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import {
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useListCategoriesForUserQuery } from "@/services/api/categories";

const NavMenu = () => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Fetch categories with default page and size
  const { data, isFetching, refetch } = useListCategoriesForUserQuery({
    page: 0,
    size: 10, // Match the API response size
    refetchOnMountOrArgChange: true,
    forceRefetch: true,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Ensure activeCategories is an array from the transformed data
  const activeCategories = Array.isArray(data) ? data.filter(item => item.status === "ACTIVE") : [];

  if (isFetching || !data) return null;

  return (
    <>
      <BottomNavigation
        sx={{
          height: 60,
          backgroundColor: "var(--header-background-color)",
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": { backgroundColor: "#333", color: "white" },
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "#333",
            },
            "& .MuiBottomNavigationAction-label": { pt: 0.5 },
          }}
          label="Trang chủ"
          icon={<HomeOutlinedIcon />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": { backgroundColor: "#333", color: "white" },
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "#333",
            },
            "& .MuiBottomNavigationAction-label": { pt: 0.5 },
          }}
          label="Danh mục sản phẩm"
          onClick={handleMenuOpen}
          icon={<MenuIcon />}
        />
        <BottomNavigationAction
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": { backgroundColor: "#333", color: "white" },
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "#333",
            },
            "& .MuiBottomNavigationAction-label": { pt: 0.5 },
          }}
          label="Hỗ trợ"
          icon={<HelpIcon />}
          component={Link}
          to="/support"
        />
        <BottomNavigationAction
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": { backgroundColor: "#333", color: "white" },
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "#333",
            },
            "& .MuiBottomNavigationAction-label": { pt: 0.5 },
          }}
          label="Liên hệ"
          icon={<ContactsIcon />}
          component={Link}
          to="/contact"
        />
        <BottomNavigationAction
          sx={{
            transition: "background-color 0.3s ease",
            "&:hover": { backgroundColor: "#333", color: "white" },
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "#333",
            },
            "& .MuiBottomNavigationAction-label": { pt: 0.5 },
          }}
          label="Về chúng tôi"
          icon={<InfoIcon />}
          component={Link}
          to="/about"
        />
      </BottomNavigation>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        {activeCategories.map((category) => (
          <MenuItem
            sx={{ padding: 2 }}
            onClick={handleMenuClose}
            component={Link}
            to="/list-products"
            key={category.id}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NavMenu;