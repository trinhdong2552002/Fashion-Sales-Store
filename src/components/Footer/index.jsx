import { Container, Grid, Typography, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Circle,
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  LocationOn,
  Phone,
  Twitter,
} from "@mui/icons-material";
import { useGetListBranchesQuery } from "@/services/api/branches";
import { useEffect } from "react";
import styles from "./index.module.css";

const Footer = () => {
  const {
    data: dataBranches,
    isLoading: isLoadingBranch,
    isError: isErrorBranch,
    error: errorBranch,
    refetch: refetchBranch,
  } = useGetListBranchesQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetchBranch();
  }, [refetchBranch]);

  const footerData = [
    {
      title: "Về chúng tôi",
      links: [
        { label: "Giới thiệu", url: "/about" },
        { label: "Hỗ trợ", url: "/support" },
        { label: "Bài viết", url: "/blog" },
        { label: "Sản phẩm", url: "/all-products" },
      ],
    },
  ];

  if (isLoadingBranch)
    return (
      <Box display={"flex"}>
        <p>Đang tải chi nhánh...</p>
      </Box>
    );

  if (isErrorBranch)
    return <div style={{ color: "red" }}>{errorBranch.message}</div>;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#121212",
        mt: 10,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
            <Typography
              variant="h5"
              sx={{ color: "#E0E0E0", fontWeight: "bold" }}
            >
              FASHION STORE
            </Typography>
            <Box>
              <Box display={"flex"} alignItems={"center"} my={2}>
                <Phone sx={{ color: "#E0E0E0" }} />
                <Typography sx={{ color: "#E0E0E0", ml: 1 }}>
                  Tổng đài CSKH: 02873066060
                </Typography>
              </Box>

               <Box display={"flex"} alignItems={"center"} my={2}>
                <Email sx={{ color: "#E0E0E0" }} />
                <Typography sx={{ color: "#E0E0E0", ml: 1 }}>
                  cskh@fashionstore.site.name.vn
                </Typography>
              </Box>
            </Box>
          </Grid>

          {footerData.map((section, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={index}>
              <Typography
                variant="h6"
                color="#E0E0E0"
                sx={{ mb: 2, fontWeight: 600, fontSize: "1.1rem" }}
              >
                {section.title}
              </Typography>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {section.links.map((link, i) => (
                  <li key={i} style={{ margin: "12px 0" }}>
                    <Link
                      to={link.url}
                      className={styles.hoverUnderlineAnimation}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
            <Typography
              variant="h6"
              color="#E0E0E0"
              sx={{ mb: 2, fontWeight: 600, fontSize: "1.1rem" }}
            >
              Hệ thống cửa hàng
              {dataBranches?.items?.map((branch) => (
                <Box key={branch.id}>
                  <Box display={"flex"} alignItems={"center"}>
                    <LocationOn />
                    <Typography color="#E0E0E0" my={2} ml={1}>
                      {branch.name}
                    </Typography>
                  </Box>
                  <Typography color="#E0E0E0" fontSize={"0.95rem"} ml={1}>
                    {branch.location}
                  </Typography>
                </Box>
              ))}
            </Typography>
          </Grid>

          {/* Social media */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
            <Typography
              variant="h6"
              color="#E0E0E0"
              sx={{ mb: 2, fontWeight: 600, fontSize: "1.1rem" }}
            >
              Theo dõi chúng tôi
            </Typography>
            <Box>
              <IconButton
                component={Link}
                className={styles.hoverUnderlineAnimation}
                sx={{ color: "#E0E0E0" }}
                to="https://facebook.com"
              >
                <Facebook />
              </IconButton>
              <IconButton
                component={Link}
                className={styles.hoverUnderlineAnimation}
                sx={{ color: "#E0E0E0" }}
                to="https://instagram.com"
              >
                <Instagram />
              </IconButton>
              <IconButton
                component={Link}
                className={styles.hoverUnderlineAnimation}
                sx={{ color: "#E0E0E0" }}
                to="https://linkedin.com"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                component={Link}
                className={styles.hoverUnderlineAnimation}
                sx={{ color: "#E0E0E0" }}
                to="https://twitter.com"
              >
                <Twitter />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom note */}
        <Box
          sx={{
            borderTop: "1px solid #ddd",
            textAlign: "center",
            mt: 6,
            pt: 3,
          }}
        >
          <Typography color="white">
            © 2025 Fashion Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
