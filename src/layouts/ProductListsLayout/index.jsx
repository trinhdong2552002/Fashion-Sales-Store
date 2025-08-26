import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WallpaperRepresentative from "@/components/WallpaperRepresentative";
import { Fragment } from "react";

const ProductListsLayout = () => {
  return (
    <Fragment>
      <Header />
      <WallpaperRepresentative titleHeader="Danh sách sản phẩm" />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default ProductListsLayout;
