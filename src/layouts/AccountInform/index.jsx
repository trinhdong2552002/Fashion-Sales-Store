import { Outlet } from "react-router-dom";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Fragment } from "react";

const AccountInform = () => {
  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
};

export default AccountInform;
