import { Fragment } from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
import WallpaperRepresentative from "@/components/wallpaper-representative";
import { Outlet } from "react-router-dom";
import BreadcrumbNav from "@/components/bread-crumb";

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
