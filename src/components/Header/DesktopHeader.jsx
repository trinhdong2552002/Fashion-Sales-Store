import {
  ArticleOutlined,
  HelpOutline,
  InfoOutline,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { Box, Container, Menu, MenuItem, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { slugify } from "@/utils/slugify";
import SearchBar from "./SearchBar";
import CartButton from "./CartButton";
import AuthButton from "./AuthButton";

const DesktopHeader = ({ activeCategories }) => {
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Fragment>
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
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent="space-between"
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

            <Link to={"/help"} style={linkStyle}>
              <Box display={"flex"} alignItems={"center"}>
                <HelpOutline />
                <Typography variant="body1" ml={1}>
                  Trợ giúp
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

            {/* Cart button and Auth button */}
            <CartButton />
            <AuthButton />
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};

export default DesktopHeader;
