import { Route, Routes } from "react-router-dom";

import AccountInform from "./layouts/AccountInform";
import Address from "./pages/AddressPage";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/ProfilePage";

import ScrollToTop from "@/components/ScrollToTop";
import ForgotPasswordLayout from "@/layouts/ForgotPasswordLayout";
import MainLayout from "@/layouts/MainLayout";
import About from "@/pages/AboutPage";
import Contact from "@/pages/ContactPage";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/HomePage";
import Login from "@/pages/LoginPage";
import MyOrders from "@/pages/MyOrdersPage";
import OrderConfirmation from "@/pages/OrderConfirmationPage";
import ProductDetails from "@/pages/ProductDetailsPage";
import ProductLists from "@/pages/ProductListsPage";
import Register from "@/pages/RegisterPage";
import ShippingMethod from "@/pages/ShippingMethodPage";
import Support from "@/pages/SupportPage";
import VerifyAccount from "@/pages/VerifyAccountPage";
import ResetPassword from "./pages/ResetPasswordPage";
import ForgotPasswordVerify from "./pages/ForgotPassword/shared/ForgotPasswordVerify";
import ThemeProvider from "./context/ThemeProvider";
import ProductListsLayout from "./layouts/ProductListsLayout";
import AddressListForUser from "./pages/AddressPage/shared/AddressListForUser";
import AddressInform from "./pages/AddressPage/shared/AddressInform";

const App = () => {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        {/* Route dependencies component Header and Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="support" element={<Support />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPasswordLayout />}>
          <Route index element={<ForgotPassword />} />
          <Route
            path="forgot-password-verify"
            element={<ForgotPasswordVerify />}
          />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/register/verify-account" element={<VerifyAccount />} />

        <Route path="/list-products" element={<ProductListsLayout />}>
          <Route index element={<ProductLists />} />
        </Route>

        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/shippingMethod" element={<ShippingMethod />} />
        <Route path="/orderConfirmation" element={<OrderConfirmation />} />

        {/* Route information user */}
        <Route path="/accountInform" element={<AccountInform />}>
          <Route path="profile/:id" element={<Profile />} />
          <Route path="changePassword/:id" element={<ChangePassword />} />
          <Route path="address/:id" element={<Address />} />
          <Route
            path="addressListForUser/:id"
            element={<AddressListForUser />}
          />
          <Route path="newAddress/:id" element={<AddressInform />} />
        </Route>

        <Route path="/myOrders" element={<MyOrders />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
