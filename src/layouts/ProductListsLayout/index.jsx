import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Fragment } from "react";
import AoThun from "/src/assets/images/banner/banner_ao-thun.jpg";
import AoSoMi from "/src/assets/images/banner/banner_ao-so-mi.jpg";
import AoKhoac from "/src/assets/images/banner/banner_ao-khoac.jpg";
import QuanTay from "/src/assets/images/banner/banner_quan-tay.jpg";
import QuanShorts from "/src/assets/images/banner/banner_quan-shorts.jpg";
import PhuKien from "/src/assets/images/banner/banner_shoes-accessories.jpg";
import TatCaSanPham from "/src/assets/images/banner/banner_all-products.jpg";
import BreadcrumbNav from "@/components/Breadcrumbs/BreadcrumbNav";

const ProductListsLayout = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  const getBannerImage = () => {
    switch (category) {
      case "ao-thun":
        return AoThun;
      case "ao-so-mi":
        return AoSoMi;
      case "ao-khoac":
        return AoKhoac;
      case "quan-tay":
        return QuanTay;
      case "quan-shorts":
        return QuanShorts;
      case "phu-kien":
        return PhuKien;
      default:
        return TatCaSanPham;
    }
  };

  return (
    <Fragment>
      <Header />
      <BreadcrumbNav />
      <img
        src={getBannerImage()}
        alt={`Banner ${category || "default"}`}
        width="100%"
        style={{objectFit: "cover"}}
      />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default ProductListsLayout;
