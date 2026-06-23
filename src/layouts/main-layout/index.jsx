import { Outlet } from "react-router-dom";
import Footer from "@/components/footer";
import Header from "@/components/header";
import BreadcrumbNav from "@/components/bread-crumb";
import { Box } from "@mui/material";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <BreadcrumbNav />
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
