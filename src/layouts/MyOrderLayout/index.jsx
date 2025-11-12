import { Fragment } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WallpaperRepresentative from "@/components/WallpaperRepresentative";
import { Outlet } from "react-router-dom";
import BreadcrumbNav from "@/components/Breadcrumbs/BreadcrumbNav";

const MyOrderLayout = () => {
  return (
    <Fragment>
      <Header />
      <BreadcrumbNav />
      <WallpaperRepresentative titleHeader="Đơn hàng của tôi" />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default MyOrderLayout;
