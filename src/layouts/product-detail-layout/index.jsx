import BreadcrumbNav from "@/components/bread-crumb";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const ProductDetailLayout = () => {
  return (
    <Fragment>
      <Header />
      <BreadcrumbNav />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default ProductDetailLayout;
