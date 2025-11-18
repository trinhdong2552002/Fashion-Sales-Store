import { Close, ExpandMore, Menu, Search } from "@mui/icons-material";
import {
  Box,
  Container,
  Drawer,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthButton from "./AuthButton";
import CartButton from "./CartButton";

import { slugify } from "@/utils/slugify";

const mapListMenuLinkMobile = [
  { id: 1, name: "Blog", link: "/blog" },
  { id: 2, name: "Trợ giúp", link: "/help" },
  { id: 3, name: "Về chúng tôi", link: "/about" },
];

const MobileHeader = ({ activeCategories }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleCategoryClick = (category) => {
    setOpen(false);
    navigate(`/all-products?category=${slugify(category.name)}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const DrawContent = () => (
    <Box width={300} height={"100%"} p={2}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        my={2}
        ml={6}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Typography
            variant="h5"
            fontSize={"1.3rem"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            FASHION STORE
          </Typography>
        </Link>

        <IconButton onClick={toggleDrawer(false)} sx={{ p: 0 }}>
          <Close />
        </IconButton>
      </Box>

      {/* Menu navigation with Accordion */}
      <Accordion
        elevation={0}
        disableGutters
        sx={{
          "&:before": {
            display: "none",
          },
          boxShadow: "none",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h4" fontSize={"1.1rem"} ml={1}>
            Danh mục
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <Box display={"flex"} flexDirection={"column"}>
            {activeCategories.map((category) => (
              <Typography
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                variant="body1"
                fontSize={"1rem"}
                ml={4}
                p={1.5}
                sx={{ cursor: "pointer" }}
              >
                {category.name}
              </Typography>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>

      {mapListMenuLinkMobile.map((item) => (
        <Link
          key={item.id}
          to={item.link}
          style={{ color: "black", textDecoration: "none", cursor: "pointer" }}
          onClick={toggleDrawer(false)}
        >
          <Typography variant="h4" fontSize={"1.1rem"} ml={1} p={2}>
            {item.name}
          </Typography>
        </Link>
      ))}

      <AuthButton />
    </Box>
  );

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
        <Container maxWidth="lg">
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            p={1}
          >
            <Box display={"flex"} alignItems={"center"}>
              <IconButton>
                <Menu onClick={toggleDrawer(true)} />
              </IconButton>
              <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <DrawContent />
              </Drawer>

              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", fontSize: "1.2rem", ml: 2 }}
                >
                  FASHION STORE
                </Typography>
              </Link>
            </Box>

            <Box display={"flex"} alignItems={"center"}>
              <IconButton sx={{ mr: 1 }}>
                <Search />
              </IconButton>
              <CartButton />
            </Box>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
};
export default MobileHeader;
