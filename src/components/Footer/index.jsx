import { Container, Grid, Typography, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

const Footer = () => {
  const footerData = [
    {
      title: "Chăm sóc khách hàng",
      links: [
        { label: "Trung tâm trợ giúp", url: "/help" },
        { label: "Cửa hàng Blog", url: "/blog" },
        { label: "Hướng dẫn mua hàng", url: "/guide" },
        { label: "Hướng dẫn bảo hành", url: "/warranty" },
        { label: "Trả hàng & hoàn tiền", url: "/refund" },
        { label: "Chăm sóc khách hàng", url: "/support" },
        { label: "Chính sách bảo hành", url: "/policy" },
        { label: "Vận chuyển", url: "/shipping" },
      ],
    },
    {
      title: "Giới thiệu",
      links: [
        { label: "Về chúng tôi", url: "/about" },
        { label: "Tuyển dụng", url: "/career" },
        { label: "Điều khoản", url: "/terms" },
        { label: "Chính sách bảo mật", url: "/privacy" },
        { label: "Chính hãng", url: "/authentic" },
        { label: "Kênh người bán", url: "/seller" },
        { label: "Flash Sales", url: "/flash-sales" },
        { label: "Tiếp thị liên kết", url: "/affiliate" },
      ],
    },
    {
      title: "Danh mục",
      links: [
        { label: "Áo thun", url: "/category/tshirt" },
        { label: "Áo sơ mi", url: "/category/shirt" },
        { label: "Áo khoác", url: "/category/jacket" },
        { label: "Quần dài", url: "/category/pants" },
        { label: "Quần shorts", url: "/category/shorts" },
        { label: "Phụ kiện", url: "/category/accessories" },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f9f9f9",
        borderTop: "1px solid #eee",
        mt: 10,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {footerData.map((section, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 600, fontSize: "1.1rem" }}
              >
                {section.title}
              </Typography>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {section.links.map((link, i) => (
                  <li key={i} style={{ marginBottom: "8px" }}>
                    <Link
                      to={link.url}
                      style={{
                        textDecoration: "none",
                        color: "#555",
                        fontSize: "0.95rem",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}

          {/* Social media */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 600, fontSize: "1.1rem" }}
            >
              Theo dõi chúng tôi
            </Typography>
            <Box>
              <IconButton component={Link} to="https://facebook.com">
                <Facebook />
              </IconButton>
              <IconButton component={Link} to="https://instagram.com">
                <Instagram />
              </IconButton>
              <IconButton component={Link} to="https://linkedin.com">
                <LinkedIn />
              </IconButton>
              <IconButton component={Link} to="https://twitter.com">
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
          <Typography variant="body2" color="text.secondary">
            © 2025 Fashion Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
