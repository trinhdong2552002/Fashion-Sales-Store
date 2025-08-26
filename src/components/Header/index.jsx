import { Container, Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AuthButton from "./AuthButton";
import CartButton from "./CartButton";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100, // Matches MUI AppBar default z-index
        backgroundColor: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Container maxWidth="lg">
          <Stack
            direction="row"
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
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold" }}
              >
                FASHION STORE
              </Typography>
            </Link>

            <SearchBar />

            <Stack direction="row" spacing={2}>
              <CartButton />
              <AuthButton />
            </Stack>
          </Stack>
        </Container>
      </Box>

      <NavMenu />
    </Box>
  );
};

export default Header;
