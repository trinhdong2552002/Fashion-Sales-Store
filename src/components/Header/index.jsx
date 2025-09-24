import { Container, Box, Typography, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
import CartButton from "./CartButton";
import SearchBar from "./SearchBar";
import { useListCategoriesForUserQuery } from "@/services/api/categories";
import { useEffect, useState } from "react";
import { ArticleOutlined, HelpOutline, InfoOutline } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { slugify } from "@/utils/slugify";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const linkStyle = {
    color: "black",
    textDecoration: "none",
    cursor: "pointer",
  };

  // Opening the dropdown menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Closing the dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    handleClose();
    navigate(`/all-products?category=${slugify(category.name)}`);
  };

  const { data, refetch: refetchCategories } = useListCategoriesForUserQuery({
    page: 0,
    size: 10,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetchCategories();
  }, [refetchCategories]);

  const activeCategories = Array.isArray(data)
    ? data.filter((item) => item.status === "ACTIVE")
    : [];

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container maxWidth="xl">
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 2 }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              FASHION STORE
            </Typography>
            {/* <img
              style={{
                width: "150px",
                height: "auto", // auto để giữ tỉ lệ gốc
                objectFit: "contain", // đảm bảo không bị cắt méo
              }}
              src="/src/assets/images/icon/fashion_store.png"
            /> */}
          </Link>

          {/* List categories */}
          <Box onClick={handleMenuClick} style={linkStyle}>
            <Box display={"flex"} alignItems={"center"}>
              <MenuIcon />
              <Typography variant="body1" ml={1}>
                Danh mục
              </Typography>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ mt: 1 }}
          >
            {activeCategories.map((category) => (
              <MenuItem
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                sx={{ p: 2 }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Menu>

          <Link to="/blog" style={linkStyle}>
            <Box display={"flex"} alignItems={"center"}>
              <ArticleOutlined />
              <Typography variant="body1" ml={1}>
                Blog
              </Typography>
            </Box>
          </Link>

          <SearchBar />

          <Link to={"/support"} style={linkStyle}>
            <Box display={"flex"} alignItems={"center"}>
              <HelpOutline />
              <Typography variant="body1" ml={1}>
                Hỗ trợ
              </Typography>
            </Box>
          </Link>

          <Link to="/about" style={linkStyle}>
            <Box display={"flex"} alignItems={"center"}>
              <InfoOutline />
              <Typography variant="body1" ml={1}>
                Về chúng tôi
              </Typography>
            </Box>
          </Link>

          <CartButton />
          <AuthButton />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
