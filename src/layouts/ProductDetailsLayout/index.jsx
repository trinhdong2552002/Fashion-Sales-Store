import BreadcrumbNav from "@/components/Breadcrumbs/BreadcrumbNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const ProductDetailsLayout = () => {
  return (
    <Fragment>
      <Header />
      <BreadcrumbNav />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default ProductDetailsLayout;
